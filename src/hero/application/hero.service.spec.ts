import { Test, TestingModule } from '@nestjs/testing';
import { HeroService } from './hero.service';
import { HeroRepositoryNosql } from '../persistance/hero.repository.nosql';
import { Hero } from '../domain/hero';
import { HeroRarities } from '../domain/hero.rarities';
import { HeroSpecialties } from '../domain/hero.specialties';
import { HeroController } from '../exposition/controller/hero.controller';
import { UpdateHeroDto } from '../dto/update-hero.dto';

describe('HeroService', () => {
  let service: HeroService;
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

    async findOne(id: string): Promise<number | Hero> {
      const hero = mockedDatabase.find((hero) => hero.id == id);
      if (!hero) return -1;
      return hero;
    },

    async remove(id: string) {
      const index = mockedDatabase.findIndex((hero) => {
        return hero.id == id;
      });
      if (index > -1) {
        mockedDatabase.splice(index, 1);
      }
    },

    async update(id: string, updateHeroDto: UpdateHeroDto) {
      const index = mockedDatabase.findIndex((hero) => {
        return hero.id == id;
      });
      if (index != -1) {
        for (const recipientProps of Object.keys(updateHeroDto)) {
          if (updateHeroDto[recipientProps]) {
            mockedDatabase[index][recipientProps] =
              updateHeroDto[recipientProps];
          }
        }
      }
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

  it('should defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all hero', async () => {
    const heroes = await service.findAll();
    expect(heroes.length).toBe(2);
  });

  it('should find hero with id 0', async () => {
    const hero = await service.findOne('0');
    if (hero instanceof Hero) {
      expect(hero.name).toBe('Nathan');
    }
  });

  it('should return error code -1 because no hero found', async () => {
    const hero = await service.findOne('2');
    expect(hero).toBe(-1);
  });

  it('should delete hero with id 0', async () => {
    await service.remove('0');
    const deletedHero = await service.findOne('0');
    expect(deletedHero).toBe(-1);
  });

  it('should update hero with id 1', async () => {
    await service.update('1', {
      name: 'paul',
      experiencePoints: 2,
    });
    const updatedHero = await service.findOne('1');

    if (typeof updatedHero !== 'number') {
      expect(updatedHero.name).toBe('paul');
      expect(updatedHero.experiencePoints).toBe(2);
    }
  });
});
