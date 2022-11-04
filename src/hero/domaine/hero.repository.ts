import { UpdateHeroDto } from '../dto/update-hero.dto';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { Hero } from './hero';

export interface HeroRepository {
  create(createHeroDto: CreateHeroDto): Promise<Hero>;

  findAll(): Promise<Hero[]>;

  findOne(id: string): Promise<Hero>;

  update(id: string, updateHeroDto: UpdateHeroDto): Promise<Hero>;

  remove(id: string): Promise<Hero>;
}
