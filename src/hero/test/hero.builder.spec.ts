import { HeroService } from '../application/hero.service';
import { HeroBuilder } from '../domain/hero.builder';
import { HeroSpecificationBySpeciality } from '../domain/hero.specification.by.speciality';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { Hero } from '../domain/hero';
import { HeroEntity } from '../entities/hero.entity';
import { strToObjectId } from '../../utils/string.to.objectId';

describe('HeroService', () => {
  let heroBuilder: HeroBuilder;

  beforeEach(async () => {
    heroBuilder = new HeroBuilder(new HeroSpecificationBySpeciality());
  });

  it('should defined', () => {
    expect(heroBuilder).toBeDefined();
  });

  it('should return hero based on speciality', () => {
    const heroDto: CreateHeroDto = {
      name: 'jean',
      specialty: 'Tank',
      rarity: 'Rare',
    };

    const hero: Hero = <Hero>(
      heroBuilder
        .rarity(heroDto.rarity)
        .specialty(heroDto.specialty)
        .setStandardHealthPointsPowerAndArmour()
        .build()
    );

    expect(hero instanceof Hero).toBeTruthy();
    expect(hero.armour).toEqual(20);
    expect(hero.power).toEqual(100);
    expect(hero.healthPoints).toEqual(1000);
  });

  it('should return hero', () => {
    const heroEntity: HeroEntity = {
      _id: strToObjectId('636e5b66fe76780dc4eff087'),
      armour: 10,
      experiencePoints: 3,
      healthPoints: 1200,
      level: 2,
      power: 27,
      name: 'pierre',
      specialty: 'Tank',
      rarity: 'Common',
    };

    const hero: Hero = <Hero>(
      heroBuilder
        .name(heroEntity.name)
        .level(heroEntity.level)
        .power(heroEntity.power)
        .experiencePoints(heroEntity.experiencePoints)
        .healthPoints(heroEntity.healthPoints)
        .armour(heroEntity.armour)
        .specialty(heroEntity.specialty)
        .rarity(heroEntity.rarity)
        .build()
    );

    expect(hero instanceof Hero).toBeTruthy();
    expect(hero.armour).toEqual(10);
    expect(hero.power).toEqual(27);
    expect(hero.healthPoints).toEqual(1200);
  });

  it('should return an -2 error code because wrong speciality', () => {
    const heroDto: CreateHeroDto = {
      name: 'jean',
      specialty: 'Wrong',
      rarity: 'Rare',
    };

    const hero: number = <number>(
      heroBuilder
        .rarity(heroDto.rarity)
        .specialty(heroDto.specialty)
        .setStandardHealthPointsPowerAndArmour()
        .build()
    );

    expect(typeof hero).toBe('number');
    expect(hero).toBe(-2);
  });

  it('should return an -2 error code because wrong rarity', () => {
    const heroDto: CreateHeroDto = {
      name: 'jean',
      specialty: 'Tank',
      rarity: 'NoIdea',
    };

    const hero: number = <number>(
      heroBuilder
        .rarity(heroDto.rarity)
        .specialty(heroDto.specialty)
        .setStandardHealthPointsPowerAndArmour()
        .build()
    );

    expect(typeof hero).toBe('number');
    expect(hero).toBe(-2);
  });

  it('should -2 error because of wrong power', () => {
    const hero = heroBuilder.id('636e5b66fe76780dc4eff087').power(0).build();

    expect(typeof hero).toBe('number');
    expect(hero).toEqual(-2);
  });

  it('should -2 error because of wrong healthPoints', () => {
    const hero = heroBuilder
      .id('636e5b66fe76780dc4eff087')
      .healthPoints(0)
      .build();

    expect(typeof hero).toBe('number');
    expect(hero).toEqual(-2);
  });

  it('should -2 error because of wrong level', () => {
    const hero = heroBuilder.id('636e5b66fe76780dc4eff087').level(0).build();

    expect(typeof hero).toBe('number');
    expect(hero).toEqual(-2);
  });

  it('should -2 error because of wrong armour', () => {
    const hero = heroBuilder.id('636e5b66fe76780dc4eff087').armour(0).build();

    expect(typeof hero).toBe('number');
    expect(hero).toEqual(-2);
  });
});
