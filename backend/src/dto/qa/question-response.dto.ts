import { Expose, Type } from 'class-transformer';
import { VoteType } from '../../entities/vote.entity';

// User info in question response - only public fields
export class QuestionUserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  avatar?: string;

  @Expose()
  bio?: string;
}

// Main question response DTO
export class QuestionResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  upvote_count: number;

  @Expose()
  downvote_count: number;

  @Expose()
  answer_count: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  @Type(() => QuestionUserDto)
  user?: QuestionUserDto;

  // User's vote status for this question (upvote, downvote, or null if not voted)
  @Expose()
  userVoteStatus?: VoteType | null;

  @Expose()
  get net_votes(): number {
    return this.upvote_count - this.downvote_count;
  }
}

// Paginated response
export class PaginatedQuestionsResponseDto {
  @Expose()
  @Type(() => QuestionResponseDto)
  data: QuestionResponseDto[];

  @Expose()
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
