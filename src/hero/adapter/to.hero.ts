import { HeroEntity } from '../entities/hero.entity';
import { Hero } from '../domain/hero';

export class ToHero {
  public static fromHeroEntity(heroEntity: HeroEntity): Hero | number {
    return Hero.create()
      .id(heroEntity._id)
      .name(heroEntity.name)
      .level(heroEntity.level)
      .power(heroEntity.power)
      .experiencePoints(heroEntity.experiencePoints)
      .healthPoints(heroEntity.healthPoints)
      .armour(heroEntity.armour)
      .specialty(heroEntity.specialty)
      .rarity(heroEntity.rarity)
      .build();
  }
}
