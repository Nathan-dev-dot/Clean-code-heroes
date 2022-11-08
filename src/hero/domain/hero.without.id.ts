import { HeroEntity } from '../entities/hero.entity';
import { DeepPartial } from 'typeorm';

export type HeroWithoutId = DeepPartial<HeroEntity>;
