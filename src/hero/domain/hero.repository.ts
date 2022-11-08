import { UpdateHeroDto } from '../dto/update-hero.dto';
import { HeroEntity } from '../entities/hero.entity';
import { HeroWithoutId } from './hero.without.id';

export interface HeroRepository {
  create(createHeroDto: HeroWithoutId): Promise<HeroEntity>;

  findAll(): Promise<HeroEntity[]>;

  findOne(id: string): Promise<HeroEntity>;

  update(id: string, updateHeroDto: UpdateHeroDto): Promise<HeroEntity>;

  remove(id: string);
}
