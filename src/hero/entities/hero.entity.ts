import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hero' })
export class HeroEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'string', nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  healthPoints: number;

  @Column({ type: 'integer', nullable: false })
  experiencePoints: number;

  @Column({ type: 'integer', nullable: false })
  power: number;

  @Column({ type: 'integer', nullable: false })
  armour: number;

  @Column({ type: 'string', nullable: false })
  specialty: string;

  @Column({ type: 'string', nullable: false })
  rarity: string;

  @Column({ type: 'integer', nullable: false })
  level: number;
}
