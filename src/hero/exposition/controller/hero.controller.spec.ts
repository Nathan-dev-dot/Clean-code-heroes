import { Test, TestingModule } from '@nestjs/testing';
import { HeroController } from './hero.controller';
import { HeroRepositoryNosql } from '../../persistance/hero.repository.nosql';
import { HeroService } from '../../application/hero.service';
import { HeroNotFoundException } from '../../application/exceptions/hero.not.found.exception';
import { HeroResponse } from '../../domain/hero.response';
import { CreateHeroDto } from '../../dto/create-hero.dto';
import { HeroInvalidArgumentException } from '../../application/exceptions/hero.invalid.argument.exception';
import { MockedHeroRepository } from '../../test/mocked.hero.repository';

describe('HeroController', () => {
  let controller: HeroController;

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
      specialty: 'Sorcerer',
      rarity: 'Rare',
    };

    const hero = await controller.create(createHeroDto);
    const lastInsertedHero = await controller.findOne(
      ((await controller.findAll()).length - 1).toString(),
    );
    expect(hero).toEqual(lastInsertedHero);
  });

  it('should throw an HeroInvalidArgument exception', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'jean',
      specialty: '',
      rarity: 'Rare',
    };

    await expect(controller.create(createHeroDto)).rejects.toThrowError(
      HeroInvalidArgumentException,
    );
  });

  it('should find hero with name Nathan', async () => {
    const hero: HeroResponse = await controller.findOne('0');
    expect(hero.name).toEqual('Nathan');
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
