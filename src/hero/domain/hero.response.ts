import { HeroProps } from './hero.props';

export class HeroResponse {
  readonly armour: number;
  readonly experiencePoints: number;
  readonly healthPoints: number;
  readonly id: string;
  readonly level: number;
  readonly name: string;
  readonly power: number;
  readonly rarity: string;
  readonly specialty: string;

  constructor(heroEntity: HeroProps) {
    this.id = heroEntity.id;
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
