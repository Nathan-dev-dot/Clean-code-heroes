import { HeroRepository } from '../domaine/hero.repository';
import { Hero } from '../domaine/hero';
import { HeroWithoutId } from '../domaine/hero.without.id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HeroRepositoryNosql implements HeroRepository {
  create(createHeroDto: HeroWithoutId): Promise<Hero> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<Hero[]> {
    return Promise.resolve(undefined);
  }

  findOne(id: string): Promise<Hero> {
    return Promise.resolve(undefined);
  }

  remove(id: string): Promise<Hero> {
    return Promise.resolve(undefined);
  }

  update(id: string, updateHeroDto: Partial<Hero>): Promise<Hero> {
    return Promise.resolve(undefined);
  }
}
