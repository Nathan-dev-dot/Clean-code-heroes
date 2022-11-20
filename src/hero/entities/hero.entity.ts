import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from 'typeorm';
import { DeckEntity } from '../../deck/entities/deck.entity';

@Entity({ name: 'hero' })
export class HeroEntity {
  @ObjectIdColumn()
  _id: ObjectID;

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

  @OneToMany(() => DeckEntity, (deck) => deck.heroes)
  deck: DeckEntity[];
}
