import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article_categories')
export class ArticleCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  article_id: string;

  @Column({ type: 'uuid' })
  category_id: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  relevance_score: number;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;
}
