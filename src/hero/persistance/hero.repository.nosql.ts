import { HeroRepository } from '../domaine/hero.repository';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { Hero } from '../domaine/hero';
import { HeroWithoutId } from '../domaine/hero.without.id';

export class HeroRepositoryNosql implements HeroRepository {
  create(createHeroDto: HeroWithoutId): Promise<Hero> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Hero[]> {
    return Promise.resolve(undefined);
  }

  findOne(id: number): Promise<Hero> {
    return Promise.resolve(undefined);
  }

  remove(id: number): Promise<Hero> {
    return Promise.resolve(undefined);
  }

  update(id: number, updateHeroDto: Partial<Hero>): Promise<Hero> {
    return Promise.resolve(undefined);
  }
}
