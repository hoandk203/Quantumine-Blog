import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
export class NewsArticle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  author: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  publish_date: Date;

  @Column({ type: 'varchar', length: 2000 })
  source_url: string;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  image_url: string;

  @Column({ type: 'varchar', length: 64 })
  url_hash: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  content_hash: string;

  @Column({ type: 'timestamp with time zone' })
  last_seen: Date;

  @Column({ type: 'uuid', nullable: true })
  crawl_job_id: string;

  @Column({ type: 'simple-array', nullable: true })
  keywords_matched: string[];

  @Column({ type: 'float', nullable: true })
  relevance_score: number;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;
}
