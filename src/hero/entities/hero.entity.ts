import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hero' })
export class HeroEntity {
  @PrimaryGeneratedColumn()
  id: string;
}
