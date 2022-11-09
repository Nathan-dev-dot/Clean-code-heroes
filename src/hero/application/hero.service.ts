import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { HeroRepositoryNosql } from '../persistance/hero.repository.nosql';
import { HeroWithoutId } from '../domain/hero.without.id';
import { HeroSpecialties } from '../domain/hero.specialties';
import { HeroRarities } from '../domain/hero.rarities';
import { ErrorsCodesHero } from './exceptions/errors.codes.hero';
import { HeroEntity } from '../entities/hero.entity';

@Injectable()
export class HeroService {
  constructor(private heroRepository: HeroRepositoryNosql) {}

  create(createHeroDto: CreateHeroDto): Promise<HeroEntity> | number {
    const hero = this.createHeroWithoutId(createHeroDto);
    if (typeof hero == 'number') return hero;
    return this.heroRepository.create(hero);
  }

  findAll(): Promise<HeroEntity[]> {
    return this.heroRepository.findAll();
  }

  async findOne(id: string): Promise<HeroEntity | number> {
    const hero = await this.heroRepository.findOne(id);
    if (!hero) {
      return ErrorsCodesHero.NotFoundException;
    }
    return hero;
  }

  update(id: string, updateHeroDto: UpdateHeroDto): Promise<HeroEntity> {
    return this.heroRepository.update(id, updateHeroDto);
  }

  async remove(id: string) {
    await this.heroRepository.remove(id);
  }

  createHeroWithoutId(createHeroDto: CreateHeroDto): HeroWithoutId | number {
    if (
      !HeroRarities[createHeroDto.rarity] ||
      !HeroSpecialties[createHeroDto.specialty] ||
      createHeroDto.healthPoints < 1
    ) {
      return ErrorsCodesHero.InvalidArgument;
    }

    const hero: HeroWithoutId = {
      name: createHeroDto.name,
      healthPoints: createHeroDto.healthPoints,
      experiencePoints: createHeroDto.experiencePoints,
      power: createHeroDto.power,
      armour: createHeroDto.armour,
      specialty: HeroSpecialties[createHeroDto.specialty],
      rarity: HeroRarities[createHeroDto.rarity],
      level: 1,
    };
    return hero;
  }
}
