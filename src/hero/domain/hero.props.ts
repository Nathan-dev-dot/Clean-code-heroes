import { HeroSpecialties } from './hero.specialties';
import { HeroRarities } from './hero.rarities';

export interface HeroProps {
  readonly id?: string;
  readonly name: string;
  readonly healthPoints: number;
  readonly experiencePoints: number;
  readonly power: number;
  readonly armour: number;
  readonly specialty: HeroSpecialties;
  readonly rarity: HeroRarities;
  readonly level: number;
}
