import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class NewsCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'jsonb', default: [] })
  keywords: string[];

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;
}
