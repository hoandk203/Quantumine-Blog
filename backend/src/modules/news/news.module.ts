import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsArticle } from '../../entities/news-article.entity';
import { NewsCategory } from '../../entities/news-category.entity';
import { ArticleCategory } from '../../entities/article-category.entity';

@Module({
  imports: [
    // Secondary database connection for NeonTech News DB
    TypeOrmModule.forRootAsync({
      name: 'newsConnection',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('NEWS_DB_URL'),
        entities: [NewsArticle, NewsCategory, ArticleCategory],
        synchronize: false, // Don't sync schema, use existing tables
        logging: false,
        ssl: {
          rejectUnauthorized: false, // NeonTech uses self-signed certificates
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([NewsArticle, NewsCategory, ArticleCategory], 'newsConnection'),
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
