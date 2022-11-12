import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { HeroRepositoryNosql } from '../persistance/hero.repository.nosql';
import { ErrorsCodesHero } from './exceptions/errors.codes.hero';
import { HeroEntity } from '../entities/hero.entity';
import { Hero } from '../domain/hero';
import { ToHero } from '../adapter/to.hero';

@Injectable()
export class HeroService {
  constructor(private heroRepository: HeroRepositoryNosql) {}

  async create(createHeroDto: CreateHeroDto): Promise<Hero | number> {
    const newHero = this.createHero(createHeroDto);

    if (!(newHero instanceof Hero) && typeof newHero == 'number')
      return ErrorsCodesHero.InvalidArgument;

    const heroEntity = await this.heroRepository.create(newHero);
    return ToHero.fromHeroEntity(heroEntity);
  }

  findAll(): Promise<HeroEntity[]> {
    return this.heroRepository.findAll();
  }

  async findOne(id: string): Promise<Hero | number> {
    const heroEntity = await this.heroRepository.findOne(id);

    if (!heroEntity) {
      return ErrorsCodesHero.NotFoundException;
    }
    return ToHero.fromHeroEntity(heroEntity);
  }

  async update(
    id: string,
    updateHeroDto: UpdateHeroDto,
  ): Promise<Hero | number> {
    await this.heroRepository.update(id, updateHeroDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.heroRepository.remove(id);
  }

  createHero(createHeroDto: CreateHeroDto): Hero | number {
    return Hero.create()
      .name(createHeroDto.name)
      .specialty(createHeroDto.specialty)
      .rarity(createHeroDto.rarity)
      .setStandardHealthPointsPowerAndArmour()
      .build();
  }
}
