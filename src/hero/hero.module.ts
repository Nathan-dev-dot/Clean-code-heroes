import { Module } from '@nestjs/common';
import { HeroService } from './application/hero.service';
import { HeroController } from './exposition/controller/hero.controller';
import { HeroRepositoryNosql } from './persistance/hero.repository.nosql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroEntity } from './entities/hero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeroEntity])],
  controllers: [HeroController],
  providers: [HeroService, HeroRepositoryNosql],
})
export class HeroModule {}
