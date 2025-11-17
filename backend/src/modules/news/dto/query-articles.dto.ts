import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryArticlesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category_id?: string;
}

export class CategoryResponseDto {
  id: string;
  name: string;
  keywords: string[];
  is_active: boolean;
}

export class ArticleResponseDto {
  id: string;
  title: string;
  content: string;
  author: string;
  publish_date: Date;
  source_url: string;
  image_url: string;
  keywords_matched: string[];
  relevance_score: number;
  created_at: Date;
}
