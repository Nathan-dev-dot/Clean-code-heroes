import { UpdateHeroDto } from '../dto/update-hero.dto';
import { HeroEntity } from '../entities/hero.entity';
import { Hero } from './hero';

export interface HeroRepository {
  create(createHeroDto: Hero): Promise<HeroEntity>;

  findAll(): Promise<HeroEntity[]>;

  findOne(id: string): Promise<HeroEntity>;

  update(id: string, updateHeroDto: UpdateHeroDto): Promise<HeroEntity>;

  remove(id: string);
}
