import { HeroRepository } from '../domain/hero.repository';
import { Injectable } from '@nestjs/common';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroEntity } from '../entities/hero.entity';
import { strToObjectId } from '../../utils/string.to.objectId';
import { Hero } from '../domain/hero';

@Injectable()
export class HeroRepositoryNosql implements HeroRepository {
  constructor(
    @InjectRepository(HeroEntity) private heroes: Repository<HeroEntity>,
  ) {}

  async create(hero: Hero): Promise<HeroEntity> {
    return this.heroes.save(hero);
  }

  findAll(): Promise<HeroEntity[]> {
    return this.heroes.find();
  }

  async findOne(id: string): Promise<HeroEntity> {
    return await this.heroes.findOne({
      where: {
        _id: strToObjectId(id),
      },
    });
  }

  async remove(id: string) {
    await this.heroes.delete(id);
  }

  async update(id: string, updateHeroDto: UpdateHeroDto): Promise<HeroEntity> {
    await this.heroes.update(id, updateHeroDto);
    return this.findOne(id);
  }
}
