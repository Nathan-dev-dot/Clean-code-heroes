import { Test, TestingModule } from '@nestjs/testing';
import { HeroRepositoryNosql } from './hero.repository.nosql';
import { HeroController } from '../exposition/controller/hero.controller';
import { HeroService } from '../application/hero.service';

describe('HeroController', () => {
  let repository: HeroRepositoryNosql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [HeroService, HeroRepositoryNosql],
    }).compile();

    repository = module.get<HeroRepositoryNosql>(HeroRepositoryNosql);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
