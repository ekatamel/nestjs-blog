import { Article } from '../articles/article.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Article, (article) => article.image)
  article: Article;
}
