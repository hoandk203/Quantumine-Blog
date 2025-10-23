import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { OptionalAuthGuard } from '../../auth/guards/optional-auth.guard';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../../../dto/qa/create-question.dto';
import { QueryQuestionsDto } from '../../../dto/qa/query-questions.dto';
import { VoteDto } from '../../../dto/qa/vote.dto';
import { VoteType } from '../../../entities/vote.entity';

@Controller('qa/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Request() req,
  ) {
    const question = await this.questionService.createQuestion(
      createQuestionDto,
      req.user.id,
    );
    return {
      success: true,
      message: 'Tạo câu hỏi thành công',
      data: question,
    };
  }

  @Get()
  @UseGuards(OptionalAuthGuard)
  async findAll(@Query() queryDto: QueryQuestionsDto, @Request() req) {
    const currentUserId = req.user?.id;
    const result = await this.questionService.findAll(queryDto, currentUserId);

    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get('my-questions')
  @UseGuards(JwtAuthGuard)
  async getUserQuestions(
    @Request() req: any,
    @Query('userId') userId?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sort') sort?: 'newest' | 'oldest' | 'most_voted' | 'most_answered',
  ) {
    const targetUserId = userId || req.user.id;
    const currentUserId = req.user.id;

    const result = await this.questionService.getUserQuestions(
      targetUserId,
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search,
        sort,
      },
      currentUserId
    );

    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get(':id')
  @UseGuards(OptionalAuthGuard)
  async findOne(@Param('id') id: string, @Request() req) {
    const question = await this.questionService.findOne(id);

    if (!question) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }

    // Get user's vote status if authenticated
    let userVoteStatus = null;
    if (req.user) {
      userVoteStatus = await this.questionService.getUserVoteStatus(
        id,
        req.user.id,
      );
    }

    return {
      success: true,
      data: {
        ...question,
        userVoteStatus,
      },
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: Partial<CreateQuestionDto>,
    @Request() req,
  ) {
    const question = await this.questionService.updateQuestion(
      id,
      updateQuestionDto,
      req.user.id,
    );
    return {
      success: true,
      message: 'Cập nhật câu hỏi thành công',
      data: question,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteQuestion(@Param('id') id: string, @Request() req) {
    await this.questionService.deleteQuestion(id, req.user.id);
    return {
      success: true,
      message: 'Xóa câu hỏi thành công',
    };
  }

  @Post(':id/vote')
  @UseGuards(JwtAuthGuard)
  async vote(
    @Param('id') id: string,
    @Body() voteDto: { voteType: VoteType },
    @Request() req,
  ) {
    const result = await this.questionService.vote(
      id,
      voteDto.voteType,
      req.user.id,
    );
    return {
      success: result.success,
      message: result.message,
    };
  }

  @Get(':id/vote-status')
  @UseGuards(JwtAuthGuard)
  async getVoteStatus(@Param('id') id: string, @Request() req) {
    const voteStatus = await this.questionService.getUserVoteStatus(
      id,
      req.user.id,
    );
    return {
      success: true,
      data: { voteStatus },
    };
  }
}
