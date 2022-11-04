import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { Hero } from '../domaine/hero';
import { HeroRepositoryNosql } from '../persistance/hero.repository.nosql';
import { HeroWithoutId } from '../domaine/hero.without.id';
import { HeroSpecialties } from '../domaine/hero.specialties';
import { HeroRarities } from '../domaine/hero.rarities';

@Injectable()
export class HeroService {
  constructor(private heroRepository: HeroRepositoryNosql) {}

  create(createHeroDto: CreateHeroDto): Promise<Hero> {
    const hero: HeroWithoutId = {
      name: createHeroDto.name,
      healthPoints: createHeroDto.healthPoints,
      experiencePoints: createHeroDto.experiencePoints,
      power: createHeroDto.power,
      armour: createHeroDto.armour,
      specialty: HeroSpecialties[createHeroDto.specialty],
      rarity: HeroRarities[createHeroDto.rarity],
      level: createHeroDto.level,
    };
    return this.heroRepository.create(hero);
  }

  findAll(): Promise<Hero[]> {
    return this.heroRepository.findAll();
  }

  findOne(id: string): Promise<Hero> {
    return this.heroRepository.findOne(id);
  }

  update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    return Promise.resolve(undefined);
  }

  remove(id: string) {
    this.heroRepository.remove(id);
  }
}
