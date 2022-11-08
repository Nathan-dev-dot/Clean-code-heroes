import { HeroEntity } from '../entities/hero.entity';
import { HeroResponse } from '../domain/hero.response';
import { HeroSpecialties } from '../domain/hero.specialties';
import { HeroRarities } from '../domain/hero.rarities';

export class ToHeroResponse {
  public static fromHeroEntity(hero: HeroEntity) {
    return new HeroResponse({
      _id: hero._id,
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
