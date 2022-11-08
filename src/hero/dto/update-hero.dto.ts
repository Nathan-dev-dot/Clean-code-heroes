import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroDto } from './create-hero.dto';
import { HeroSpecialties } from '../domain/hero.specialties';
import { HeroRarities } from '../domain/hero.rarities';

export class UpdateHeroDto extends PartialType(CreateHeroDto) {
  name?: string;

  healthPoints?: number;

  experiencePoints?: number;

  power?: number;

  armour?: number;

  specialty?: HeroSpecialties;

  rarity?: HeroRarities;

  level?: number;
}
