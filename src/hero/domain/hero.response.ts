import { ObjectID } from 'typeorm';
import { HeroEntity } from '../entities/hero.entity';

export class HeroResponse {
  readonly armour: number;
  readonly experiencePoints: number;
  readonly healthPoints: number;
  readonly id: ObjectID;
  readonly level: number;
  readonly name: string;
  readonly power: number;
  readonly rarity: string;
  readonly specialty: string;

  constructor(heroEntity: HeroEntity) {
    this.id = heroEntity._id;
    this.armour = heroEntity.armour;
    this.experiencePoints = heroEntity.experiencePoints;
    this.healthPoints = heroEntity.healthPoints;
    this.level = heroEntity.level;
    this.name = heroEntity.name;
    this.power = heroEntity.power;
    this.rarity = heroEntity.rarity;
    this.specialty = heroEntity.specialty;
  }
}
