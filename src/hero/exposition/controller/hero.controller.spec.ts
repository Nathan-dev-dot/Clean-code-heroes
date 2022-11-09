import { Test, TestingModule } from '@nestjs/testing';
import { HeroController } from './hero.controller';
import { HeroRepositoryNosql } from '../../persistance/hero.repository.nosql';
import { Hero } from '../../domain/hero';
import { HeroRarities } from '../../domain/hero.rarities';
import { HeroSpecialties } from '../../domain/hero.specialties';
import { UpdateHeroDto } from '../../dto/update-hero.dto';
import { HeroService } from '../../application/hero.service';
import { HeroNotFoundException } from '../../application/exceptions/hero.not.found.exception';
import { HeroResponse } from '../../domain/hero.response';
import { CreateHeroDto } from '../../dto/create-hero.dto';
import { HeroWithoutId } from '../../domain/hero.without.id';
import { HeroInvalidArgumentException } from '../../application/exceptions/hero.invalid.argument.exception';

describe('HeroController', () => {
  let controller: HeroController;
  let mockedDatabase: Hero[] = [];

  const heroRepository = {
    async create(heroWithoutId: HeroWithoutId): Promise<Hero[]> {
      const newId = mockedDatabase.length.toString();
      const hero = new Hero({
        id: newId,
        armour: heroWithoutId.armour,
        experiencePoints: heroWithoutId.experiencePoints,
        healthPoints: heroWithoutId.healthPoints,
        level: heroWithoutId.level,
        name: heroWithoutId.name,
        power: heroWithoutId.power,
        rarity: HeroRarities[heroWithoutId.rarity],
        specialty: HeroSpecialties[heroWithoutId.specialty],
      });

      mockedDatabase.push(hero);
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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [HeroService, HeroRepositoryNosql],
    })
      .overrideProvider(HeroRepositoryNosql)
      .useValue(heroRepository)
      .compile();

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

    controller = module.get<HeroController>(HeroController);
  });

  it('should defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all hero', async () => {
    const heroes = await controller.findAll();
    expect(heroes.length).toBe(2);
  });

  it('should create a hero', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'jean',
      healthPoints: 1,
      experiencePoints: 1,
      power: 10,
      armour: 10,
      specialty: 'Tank',
      rarity: 'Rare',
    };

    const hero = await controller.create(createHeroDto);
    const lastInsertedHero = await controller.findOne(
      (mockedDatabase.length - 1).toString(),
    );
    expect(hero).toEqual(lastInsertedHero);
  });

  it('should throw an HeroInvalidArgument exception', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'jean',
      healthPoints: 1,
      experiencePoints: 1,
      power: 10,
      armour: 10,
      specialty: '',
      rarity: 'Rare',
    };

    await expect(controller.create(createHeroDto)).rejects.toThrowError(
      HeroInvalidArgumentException,
    );
  });

  it('should find hero with id 0', async () => {
    const hero: HeroResponse = await controller.findOne('0');
    if (hero instanceof HeroResponse) {
      expect(hero.name).toBe('Nathan');
    }
  });

  it('should throw notFoundHeroException', async () => {
    await expect(controller.findOne('3')).rejects.toThrowError(
      HeroNotFoundException,
    );
  });

  it('should delete hero with id 0', async () => {
    await controller.remove('0');
    await expect(controller.findOne('0')).rejects.toThrowError(
      HeroNotFoundException,
    );
  });

  it('should update hero with id 1', async () => {
    await controller.update('1', {
      name: 'paul',
      experiencePoints: 2,
    });
    const updatedHero = await controller.findOne('1');

    if (typeof updatedHero !== 'number') {
      expect(updatedHero.name).toBe('paul');
      expect(updatedHero.experiencePoints).toBe(2);
    }
  });
});
