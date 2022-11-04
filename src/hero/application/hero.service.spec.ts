import { Test, TestingModule } from '@nestjs/testing';
import { HeroService } from './hero.service';
import { HeroRepositoryNosql } from '../persistance/hero.repository.nosql';
import { Hero } from '../domaine/hero';
import { HeroRarities } from '../domaine/hero.rarities';
import { HeroSpecialties } from '../domaine/hero.specialties';
import { HeroController } from '../exposition/controller/hero.controller';

describe('HeroService', () => {
  let service: HeroService;
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

  const heroRepository = {
    async findAll(): Promise<Hero[]> {
      return mockedDatabase;
    },

    async findOne(id: string): Promise<Hero> {
      return mockedDatabase.find((hero) => hero.id == id);
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [HeroService, HeroRepositoryNosql],
    })
      .overrideProvider(HeroRepositoryNosql)
      .useValue(heroRepository)
      .compile();

    service = module.get<HeroService>(HeroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return all hero', async () => {
    const heroes = await service.findAll();
    expect(heroes.length).toBe(2);
  });
});
