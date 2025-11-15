import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NewsArticle } from '../../entities/news-article.entity';
import { NewsCategory } from '../../entities/news-category.entity';
import { ArticleCategory } from '../../entities/article-category.entity';
import { QueryArticlesDto, ArticleResponseDto, CategoryResponseDto } from './dto/query-articles.dto';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);

  constructor(
    @InjectDataSource('newsConnection')
    private newsDataSource: DataSource,
  ) {}

  async getArticles(query: QueryArticlesDto): Promise<{
    articles: ArticleResponseDto[];
    total: number;
    skip: number;
    limit: number;
  }> {
    try {
      const { skip = 0, limit = 20, search, category_id } = query;

      const queryBuilder = this.newsDataSource
        .getRepository(NewsArticle)
        .createQueryBuilder('article');

      // Filter by category
      if (category_id) {
        queryBuilder
          .innerJoin(ArticleCategory, 'ac', 'ac.article_id = article.id')
          .andWhere('ac.category_id = :category_id', { category_id });
      }

      // Filter by search keyword
      if (search) {
        queryBuilder.andWhere(
          '(article.title ILIKE :search OR article.content ILIKE :search)',
          { search: `%${search}%` },
        );
      }

      // Order by published date (newest first)
      queryBuilder.orderBy('article.publish_date', 'DESC', 'NULLS LAST');
      queryBuilder.addOrderBy('article.created_at', 'DESC');

      // Get total count
      const total = await queryBuilder.getCount();

      // Get paginated results
      const articles = await queryBuilder.skip(skip).take(limit).getMany();

      // Map to response DTO
      const articleResponses: ArticleResponseDto[] = articles.map((article) => ({
        id: article.id,
        title: article.title,
        content: article.content,
        author: article.author,
        publish_date: article.publish_date,
        source_url: article.source_url,
        image_url: article.image_url,
        keywords_matched: article.keywords_matched || [],
        relevance_score: article.relevance_score || 0,
        created_at: article.created_at,
      }));

      return {
        articles: articleResponses,
        total,
        skip,
        limit,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch articles: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getArticleById(id: string): Promise<ArticleResponseDto | null> {
    try {
      const article = await this.newsDataSource
        .getRepository(NewsArticle)
        .findOne({ where: { id } });

      if (!article) {
        return null;
      }

      return {
        id: article.id,
        title: article.title,
        content: article.content,
        author: article.author,
        publish_date: article.publish_date,
        source_url: article.source_url,
        image_url: article.image_url,
        keywords_matched: article.keywords_matched || [],
        relevance_score: article.relevance_score || 0,
        created_at: article.created_at,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch article ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getLatestArticles(limit: number = 10): Promise<ArticleResponseDto[]> {
    try {
      const articles = await this.newsDataSource
        .getRepository(NewsArticle)
        .createQueryBuilder('article')
        .orderBy('article.publish_date', 'DESC', 'NULLS LAST')
        .addOrderBy('article.created_at', 'DESC')
        .take(limit)
        .getMany();

      return articles.map((article) => ({
        id: article.id,
        title: article.title,
        content: article.content,
        author: article.author,
        publish_date: article.publish_date,
        source_url: article.source_url,
        image_url: article.image_url,
        keywords_matched: article.keywords_matched || [],
        relevance_score: article.relevance_score || 0,
        created_at: article.created_at,
      }));
    } catch (error) {
      this.logger.error(`Failed to fetch latest articles: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getCategories(): Promise<CategoryResponseDto[]> {
    try {
      const categories = await this.newsDataSource
        .getRepository(NewsCategory)
        .find({
          where: { is_active: true },
          order: { name: 'ASC' },
        });

      return categories.map((category) => ({
        id: category.id,
        name: category.name,
        keywords: category.keywords,
        is_active: category.is_active,
      }));
    } catch (error) {
      this.logger.error(`Failed to fetch categories: ${error.message}`, error.stack);
      throw error;
    }
  }
}
