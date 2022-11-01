import { Module } from '@nestjs/common';
import { HeroService } from './application/hero.service';
import { HeroController } from './exposition/controller/hero.controller';
import { HeroRepositoryNosql } from './persistance/hero.repository.nosql';

@Module({
  controllers: [HeroController],
  providers: [HeroService, HeroRepositoryNosql],
})
export class HeroModule {}
