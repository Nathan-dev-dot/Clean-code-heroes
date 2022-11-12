import { HeroResponse } from '../domain/hero.response';
import { HeroSpecialties } from '../domain/hero.specialties';
import { HeroRarities } from '../domain/hero.rarities';
import { Hero } from '../domain/hero';

export class ToHeroResponse {
  public static fromHero(hero: Hero) {
    return new HeroResponse({
      id: hero.id,
      name: hero.name,
      healthPoints: hero.healthPoints,
      level: hero.level,
      power: hero.power,
      armour: hero.armour,
      experiencePoints: hero.experiencePoints,
      specialty: HeroSpecialties[hero.specialty],
      rarity: HeroRarities[hero.rarity],
    });
  }
}
