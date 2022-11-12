import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HeroService } from '../../application/hero.service';
import { CreateHeroDto } from '../../dto/create-hero.dto';
import { UpdateHeroDto } from '../../dto/update-hero.dto';
import { HeroNotFoundException } from '../../application/exceptions/hero.not.found.exception';
import { HeroExceptionFilter } from '../filter/hero.exception.filter';
import { ToHeroResponse } from '../../adapter/to.hero.response';
import { HeroResponse } from '../../domain/hero.response';
import { HeroInvalidArgumentException } from '../../application/exceptions/hero.invalid.argument.exception';
import { Hero } from '../../domain/hero';

@Controller('hero')
@UseFilters(new HeroExceptionFilter())
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  async create(@Body() createHeroDto: CreateHeroDto): Promise<HeroResponse> {
    const newHero = await this.heroService.create(createHeroDto);
    if (typeof newHero == 'number') {
      throw new HeroInvalidArgumentException();
    }
    return ToHeroResponse.fromHero(newHero);
  }

  @Get()
  async findAll() {
    const heroes = await this.heroService.findAll();
    return heroes.map((hero) => {
      return ToHeroResponse.fromHero(<Hero>hero);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const hero = await this.heroService.findOne(id);

    if (hero == -1) {
      throw new HeroNotFoundException(id);
    }
    return ToHeroResponse.fromHero(<Hero>hero);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(id);
  }
}
