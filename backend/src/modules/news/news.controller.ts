import { Controller, Get, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';
import { QueryArticlesDto } from './dto/query-articles.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Public()
  @Get('articles')
  async getArticles(@Query() query: QueryArticlesDto) {
    try {
      return await this.newsService.getArticles(query);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch articles',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Get('articles/latest')
  async getLatestArticles(@Query('limit') limit?: number) {
    try {
      const articles = await this.newsService.getLatestArticles(limit || 10);
      return {
        articles,
        count: articles.length,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch latest articles',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Get('articles/:id')
  async getArticleById(@Param('id') id: string) {
    try {
      const article = await this.newsService.getArticleById(id);

      if (!article) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Article not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return article;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch article',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Get('categories')
  async getCategories() {
    try {
      const categories = await this.newsService.getCategories();
      return {
        categories,
        count: categories.length,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch categories',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
