import { Test, TestingModule } from '@nestjs/testing';
import { HeroService } from './hero.service';
import { HeroRepositoryNosql } from '../persistance/hero.repository.nosql';
import { Hero } from '../domain/hero';
import { HeroRarities } from '../domain/hero.rarities';
import { HeroSpecialties } from '../domain/hero.specialties';
import { HeroController } from '../exposition/controller/hero.controller';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { HeroInvalidArgumentException } from './exceptions/hero.invalid.argument.exception';

describe('HeroService', () => {
  let service: HeroService;
  let mockedDatabase: Hero[] = [];

  const heroRepository = {
    async create(hero: Hero): Promise<Hero[]> {
      const newId = mockedDatabase.length.toString();
      const NewHero = new Hero({
        id: newId,
        armour: hero.armour,
        experiencePoints: hero.experiencePoints,
        healthPoints: hero.healthPoints,
        level: hero.level,
        name: hero.name,
        power: hero.power,
        rarity: HeroRarities[hero.rarity],
        specialty: HeroSpecialties[hero.specialty],
      });

      mockedDatabase.push(NewHero);
      return this.findOne(newId);
    },

    async findAll(): Promise<Hero[]> {
      return mockedDatabase;
    },

    async findOne(id: string): Promise<number | Hero> {
      return mockedDatabase.find((hero) => hero.id == id);
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
    mockedDatabase = [
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

  it('should create a hero', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'jean',
      specialty: 'Tank',
      rarity: 'Rare',
    };

    const hero = await service.create(createHeroDto);
    const lastInsertedHero = await service.findOne(
      (mockedDatabase.length - 1).toString(),
    );
    expect(hero).toEqual(lastInsertedHero);
  });

  it('should return error code -2', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'jean',
      specialty: '',
      rarity: 'Rare',
    };

    try {
      service.create(createHeroDto);
    } catch (e) {
      await expect(e.name).toBe(HeroInvalidArgumentException.name);
    }
  });

  it('should find hero with id 0', async () => {
    const hero = await service.findOne('0');
    if (hero instanceof Hero) {
      expect(hero.name).toBe('Nathan');
    }
  });

  it('should return error code -1 because no hero found', async () => {
    const hero = await service.findOne('10');
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

  it('should return hero', () => {
    const createHeroDto: CreateHeroDto = {
      name: 'jean',
      specialty: 'Assassin',
      rarity: 'Rare',
    };

    const hero = service.createHero(createHeroDto);
    expect(hero instanceof Hero).toBeTruthy();
  });

  it('should return an error code -2 when try to create a heroWithoutId', () => {
    const createHeroDto: CreateHeroDto = {
      name: 'jean',
      specialty: '',
      rarity: 'Rare',
    };

    try {
      service.createHero(createHeroDto);
    } catch (e) {
      expect(e.name).toBe(HeroInvalidArgumentException.name);
    }
  });
});
