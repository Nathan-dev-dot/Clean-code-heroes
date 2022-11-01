import { Test, TestingModule } from '@nestjs/testing';
import { HeroRepositoryNosql } from './hero.repository.nosql';
import { HeroController } from '../exposition/controller/hero.controller';
import { HeroService } from '../application/hero.service';
import { Hero } from '../domaine/hero';
import { HeroRarities } from '../domaine/hero.rarities';
import { HeroSpecialties } from '../domaine/hero.specialties';

describe('HeroController', () => {
  let repository: HeroRepositoryNosql;
  const mockedDatabase: Hero[] = [
    new Hero({
      id: '0',
      armour: 20,
      experiencePoints: 0,
      healthPoints: 1000,
      level: 0,
      name: 'Nathan',
      power: 100,
      rarity: HeroRarities.Common,
      specialty: HeroSpecialties.Tank,
    }),
    new Hero({
      id: '1',
      armour: 5,
      experiencePoints: 0,
      healthPoints: 800,
      level: 0,
      name: 'Sarah',
      power: 150,
      rarity: HeroRarities.Rare,
      specialty: HeroSpecialties.Assassin,
    }),
  ];

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

  it('should be return all hero', async () => {
    const heroes = await repository.findAll();
    expect(heroes.length).toBe(2);
  });
});
