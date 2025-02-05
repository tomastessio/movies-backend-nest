import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column({ type: 'date' })
  releaseDate: string;

  @Column()
  gender: string;

  @CreateDateColumn()
  createdAt: Date;
}
