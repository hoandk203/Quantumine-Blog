import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Get,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UnauthorizedException,
  Put,
  Request as NestRequest,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService, GoogleProfile } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../../entities/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || req.connection.remoteAddress || '0.0.0.0';
    const userAgent = req.get('User-Agent') || '';

    return this.authService.register(registerDto, ipAddress, userAgent);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      properties: {
        user: { type: 'object' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ipAddress = req.ip || req.connection.remoteAddress || '0.0.0.0';
    const userAgent = req.get('User-Agent') || '';

    const result = await this.authService.login(loginDto, ipAddress, userAgent);

    // Set cookies for tokens with httpOnly for security
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    res.cookie('accessToken', result.accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie('refreshToken', result.refreshToken, {
      ...cookieOptions,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    // Only return user info (tokens are in httpOnly cookies)
    return {
      user: result.user,
    };
  }

  @Get('verify-email')
  @ApiOperation({ summary: 'Verify email address' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid verification token' })
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body('email') email: string, @Req() req: Request) {
    const ipAddress = req.ip || req.connection.remoteAddress || '0.0.0.0';
    return this.authService.forgotPassword(email, ipAddress);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async resetPassword(@Body('token') token: string, @Req() req: Request) {
    const ipAddress = req.ip || req.connection.remoteAddress || '0.0.0.0';
    return this.authService.resetPassword(token, ipAddress);
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(
    @Body() changePasswordDto: any,
    @NestRequest() req: any,
  ) {
    const userId = req.user.id;
    return this.authService.changePassword(changePasswordDto, userId);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  async logout(
    @GetUser() user: User,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Lấy token từ cookie hoặc Authorization header
    const token =
      req.cookies?.accessToken ||
      req.get('Authorization')?.replace('Bearer ', '') ||
      '';
    const ipAddress = req.ip || req.connection.remoteAddress || '0.0.0.0';
    const userAgent = req.get('User-Agent') || '';

    try {
      await this.authService.logout(user.id, token, ipAddress, userAgent);
    } catch (error) {
      // Log error nhưng vẫn tiếp tục clear cookies
      console.error('Logout service error:', error);
    }

    // Clear cookies
    res.clearCookie('accessToken', {
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined,
    });
    res.clearCookie('refreshToken', {
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined,
    });

    return { message: 'Logged out successfully' };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    schema: {
      properties: {
        accessToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body('refreshToken') bodyRefreshToken?: string,
  ) {
    // Lấy refresh token từ cookie hoặc body
    const refreshToken = req.cookies?.refreshToken || bodyRefreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    const result = await this.authService.refreshToken(refreshToken);

    // Cập nhật cookie với access token mới
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    return { message: 'Token refreshed successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@GetUser() user: User) {
    const userWithoutSensitive = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      socialLinks: user.socialLinks,
      active: user.active,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return { user: userWithoutSensitive };
  }

  // Google OAuth Routes
  @Post('google/code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with Google authorization code' })
  @ApiResponse({
    status: 200,
    description: 'Google login successful',
    schema: {
      properties: {
        user: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Google authentication failed' })
  async googleCode(
    @Body('code') code: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ipAddress = req.ip || req.connection.remoteAddress || '0.0.0.0';
    const userAgent = req.get('User-Agent') || '';

    const result = await this.authService.verifyGoogleCode(
      code,
      ipAddress,
      userAgent,
    );

    // Set cookies for tokens with httpOnly for security
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    res.cookie('accessToken', result.accessToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });

    res.cookie('refreshToken', result.refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Only return user info (tokens are in httpOnly cookies)
    return {
      user: result.user,
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  async googleAuth() {
    // This will redirect to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  async googleAuthCallback(
    @Req() req: Request & { user: GoogleProfile },
    @Res() res: Response,
  ) {
    const ipAddress = req.ip || req.connection.remoteAddress || '0.0.0.0';
    const userAgent = req.get('User-Agent') || '';

    try {
      const result = await this.authService.loginWithGoogle(
        req.user,
        ipAddress,
        userAgent,
      );

      // Set cookies for tokens with httpOnly for security
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      });

      // Redirect to frontend without tokens in URL (tokens are in httpOnly cookies)
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/callback?success=true`);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/login?error=oauth_failed`);
    }
  }
}
