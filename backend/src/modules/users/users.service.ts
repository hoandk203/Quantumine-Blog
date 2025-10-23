import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { ImageService } from 'src/shared/services/image.service';
import { Repository } from 'typeorm';
import { CommunityUsersResponseDto } from 'src/dto/users/community-user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly imageService: ImageService,
  ) {}

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserProfile(id: string) {
    const queryResult = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin(
        'posts',
        'post',
        'CAST(post.author_id AS TEXT) = CAST(user.id AS TEXT) AND post.active = true AND post.status = :status',
      )
      .select([
        'user.id',
        'user.name',
        'user.avatar',
        'user.bio',
        'user.socialLinks',
        'user.created_at',
        'COUNT(post.id) as total_posts',
        'COALESCE(SUM(post.view_count), 0) as total_views',
      ])
      .where('user.id = :id', { id })
      .andWhere('user.active = :active', { active: true })
      .setParameter('status', 'published')
      .groupBy('user.id')
      .getRawOne();

    if (!queryResult) {
      throw new NotFoundException('User not found');
    }

    return {
      id: queryResult.user_id,
      name: queryResult.user_name,
      avatar: queryResult.user_avatar,
      bio: queryResult.user_bio,
      socialLinks: queryResult.user_socialLinks,
      createdAt: queryResult.created_at,
      stats: {
        totalPosts: parseInt(queryResult.total_posts) || 0,
        totalViews: parseInt(queryResult.total_views) || 0,
      },
    };
  }

  async findAllAdmin(
    page = 1,
    limit = 7,
    search?: string,
    active?: string,
    role?: string,
  ) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoin(
        'posts',
        'post',
        'CAST(post.author_id AS TEXT) = CAST(user.id AS TEXT) AND post.active = true',
      )
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.role',
        'user.avatar',
        'user.created_at',
        'user.updated_at',
        'COUNT(post.id) as post_count',
      ])
      .groupBy('user.id')
      .where('user.active = :active', {
        active: active === 'true' ? true : false,
      });

    if (search) {
      queryBuilder.andWhere(
        '(user.name ILIKE :search OR user.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (role !== 'all') {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    const total = await queryBuilder.getCount();

    const users = await queryBuilder
      .orderBy('user.created_at', 'DESC')
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();

    return {
      users,
      pagination: {
        currentPage: page || 1,
        totalPages: Math.ceil(total / (limit || 10)),
        totalItems: total,
        itemsPerPage: limit || 10,
      },
    };
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(id, {
      active: false,
    });
    return { message: 'User deleted successfully' };
  }

  async restoreUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(id, {
      active: true,
    });
    return { message: 'User restored successfully' };
  }

  async updateProfile(updateUserDto: any, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.avatar) {
      const imageUrl = await this.imageService.uploadBase64Image(
        updateUserDto.avatar,
        'users-avatar',
      );
      updateUserDto.avatar = imageUrl;
    }
    await this.userRepository.update(userId, updateUserDto);
    return { message: 'User updated successfully' };
  }

  async getCommunityUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: 'newest' | 'reputation' | 'most_questions' | 'most_answers';
  }): Promise<CommunityUsersResponseDto> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const search = params.search || '';
    const sort = params.sort || 'reputation';

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoin('questions', 'question', 'question.user_id = user.id')
      .leftJoin('answers', 'answer', 'answer.user_id = user.id')
      .select([
        'user.id as id',
        'user.name as name',
        'user.avatar as avatar',
        'user.bio as bio',
        'user.created_at as "createdAt"',
        'COUNT(DISTINCT question.id) as question_count',
        'COUNT(DISTINCT answer.id) as answer_count',
        'COALESCE(SUM(DISTINCT question.upvote_count - question.downvote_count), 0) + COALESCE(SUM(DISTINCT answer.upvote_count - answer.downvote_count), 0) as reputation',
      ])
      .where('user.active = :active', { active: true })
      .groupBy('user.id');

    if (search) {
      queryBuilder.andWhere(
        '(user.name ILIKE :search OR user.bio ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Sorting
    switch (sort) {
      case 'newest':
        queryBuilder.orderBy('user.created_at', 'DESC');
        break;
      case 'most_questions':
        queryBuilder.orderBy('question_count', 'DESC');
        break;
      case 'most_answers':
        queryBuilder.orderBy('answer_count', 'DESC');
        break;
      case 'reputation':
      default:
        queryBuilder.orderBy('reputation', 'DESC');
        break;
    }

    const total = await queryBuilder.getCount();
    const rawUsers = await queryBuilder
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();

    // Map raw data to match DTO structure
    const usersData = rawUsers.map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      createdAt: user.createdAt,
      stats: {
        questions: parseInt(user.question_count) || 0,
        answers: parseInt(user.answer_count) || 0,
        reputation: parseInt(user.reputation) || 0,
      },
    }));

    // Transform to DTO
    return plainToInstance(
      CommunityUsersResponseDto,
      {
        users: usersData,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit,
        },
      },
      { excludeExtraneousValues: true },
    );
  }
}
