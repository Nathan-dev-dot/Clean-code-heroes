import { HeroRepository } from '../domaine/hero.repository';
import { Hero } from '../domaine/hero';
import { HeroWithoutId } from '../domaine/hero.without.id';
import { Injectable } from '@nestjs/common';
import { UpdateHeroDto } from '../dto/update-hero.dto';

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

  update(id: string, updateHeroDto: UpdateHeroDto): Promise<undefined> {
    return Promise.resolve(undefined);
  }
}
