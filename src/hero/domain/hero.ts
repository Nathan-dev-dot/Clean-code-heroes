import { HeroSpecialties } from './hero.specialties';
import { HeroRarities } from './hero.rarities';
import { HeroProps } from './hero.props';
import { HeroBuilder } from './hero.builder';
import { HeroSpecificationBySpeciality } from './hero.specification.by.speciality';

export class Hero implements HeroProps {
  readonly id?: string;
  readonly name: string;
  readonly healthPoints: number;
  readonly experiencePoints: number;
  readonly power: number;
  readonly armour: number;
  readonly specialty: HeroSpecialties;
  readonly rarity: HeroRarities;
  readonly level: number;

  constructor(heroProps: HeroProps) {
    if (heroProps.id) {
      this.id = heroProps.id;
    }
    this.name = heroProps.name;
    this.healthPoints = heroProps.healthPoints;
    this.experiencePoints = heroProps.experiencePoints;
    this.power = heroProps.power;
    this.armour = heroProps.armour;
    this.specialty = heroProps.specialty;
    this.rarity = heroProps.rarity;
    this.level = heroProps.level;
  }

  public static create(): HeroBuilder {
    return new HeroBuilder(new HeroSpecificationBySpeciality());
  }
}
