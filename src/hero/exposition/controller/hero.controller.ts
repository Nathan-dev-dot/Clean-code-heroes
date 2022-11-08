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
import { HeroEntity } from '../../entities/hero.entity';

@Controller('hero')
@UseFilters(new HeroExceptionFilter())
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }

  @Get()
  async findAll() {
    const heroes = await this.heroService.findAll();
    return heroes.map((hero) => {
      return ToHeroResponse.fromHeroEntity(<HeroEntity>hero);
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const hero = await this.heroService.findOne(id);
    if (hero == -1) {
      throw new HeroNotFoundException(id);
    }
    return ToHeroResponse.fromHeroEntity(<HeroEntity>hero);
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
