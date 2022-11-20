import { Test, TestingModule } from '@nestjs/testing';
import { HeroService } from './hero.service';
import { HeroRepositoryNosql } from '../persistance/hero.repository.nosql';
import { Hero } from '../domain/hero';
import { HeroController } from '../exposition/controller/hero.controller';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { HeroInvalidArgumentException } from './exceptions/hero.invalid.argument.exception';
import { MockedHeroRepository } from '../test/mocked.hero.repository';

describe('HeroService', () => {
  let service: HeroService;
  let heroRepository;

  beforeEach(async () => {
    heroRepository = new MockedHeroRepository();

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
      ((await service.findAll()).length - 1).toString(),
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
      await service.create(createHeroDto);
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
