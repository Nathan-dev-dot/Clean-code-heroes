import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';

@Injectable()
export class HeroService {
  create(createHeroDto: CreateHeroDto): Promise<Hero> {
    return 'This action adds a new hero';
  }

  findAll(): Promise<Hero[]> {
    return `This action returns all hero`;
  }

  findOne(id: number): Promise<Hero> {
    return `This action returns a #${id} hero`;
  }

  update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    return `This action updates a #${id} hero`;
  }

  remove(id: number): Promise<Hero> {
    return `This action removes a #${id} hero`;
  }
}
