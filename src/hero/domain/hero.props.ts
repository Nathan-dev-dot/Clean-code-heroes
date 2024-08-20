import { HeroSpecialties } from './hero.specialties';
import { HeroRarities } from './hero.rarities';

export interface HeroProps {
  id?: string;
  name: string;
  healthPoints: number;
  experiencePoints: number;
  power: number;
  armour: number;
  specialty: HeroSpecialties;
  rarity: HeroRarities;
  level: number;
}
