import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { Hero } from '../domaine/hero';
import { HeroRepositoryNosql } from '../persistance/hero.repository.nosql';
import { HeroWithoutId } from '../domaine/hero.without.id';
import { HeroSpecialties } from '../domaine/hero.specialties';
import { HeroRarities } from '../domaine/hero.rarities';
import { ErrorsCodesHero } from './exceptions/errors.codes.hero';

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

  async findOne(id: string): Promise<Hero | number> {
    const hero = this.heroRepository.findOne(id);
    if (!hero) return ErrorsCodesHero.NotFoundException;
    return hero;
  }

  update(id: string, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    return this.heroRepository.update(id, updateHeroDto);
  }

  remove(id: string) {
    this.heroRepository.remove(id);
  }
}
