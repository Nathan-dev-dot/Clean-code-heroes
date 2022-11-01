import { Module } from '@nestjs/common';
import { HeroService } from './application/hero.service';
import { HeroController } from './exposition/controller/hero.controller';

@Module({
  controllers: [HeroController],
  providers: [HeroService]
})
export class HeroModule {}
