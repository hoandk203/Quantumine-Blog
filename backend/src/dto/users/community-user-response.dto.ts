import { Expose, Type } from 'class-transformer';

export class CommunityUserStatsDto {
  @Expose()
  questions: number;

  @Expose()
  answers: number;

  @Expose()
  reputation: number;
}

export class CommunityUserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  avatar?: string;

  @Expose()
  bio?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => CommunityUserStatsDto)
  stats: CommunityUserStatsDto;
}

export class CommunityUsersResponseDto {
  @Expose()
  @Type(() => CommunityUserDto)
  users: CommunityUserDto[];

  @Expose()
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
