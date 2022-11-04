import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroDto } from './create-hero.dto';

export class UpdateHeroDto extends PartialType(CreateHeroDto) {
  name?: string;

  healthPoints?: number;

  experiencePoints?: number;

  power?: number;

  armour?: number;

  specialty?: string;

  rarity?: string;

  level?: number;
}
