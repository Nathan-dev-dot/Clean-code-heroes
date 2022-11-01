import { HeroSpecialties } from './hero.specialties';
import { HeroRarities } from './hero.rarities';
import { HeroProps } from './hero.props';

export class Hero implements HeroProps {
  private readonly _id?: string;
  private readonly _name: string;
  private readonly _healthPoints: number;
  private readonly _experiencePoints: number;
  private readonly _power: number;
  private readonly _armour: number;
  private readonly _specialty: HeroSpecialties;
  private readonly _rarity: HeroRarities;
  private readonly _level: number;

  constructor(heroProps: HeroProps) {
    if (heroProps.id) {
      this._id = heroProps.id;
    }
    this._name = heroProps.name;
    this._healthPoints = heroProps.healthPoints;
    this._experiencePoints = heroProps.experiencePoints;
    this._power = heroProps.power;
    this._armour = heroProps.armour;
    this._specialty = heroProps.specialty;
    this._rarity = heroProps.rarity;
    this._level = heroProps.level;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get healthPoints(): number {
    return this._healthPoints;
  }

  get experiencePoints(): number {
    return this._experiencePoints;
  }

  get power(): number {
    return this._power;
  }

  get armour(): number {
    return this._armour;
  }

  get specialty(): HeroSpecialties {
    return this._specialty;
  }

  get rarity(): HeroRarities {
    return this._rarity;
  }

  get level(): number {
    return this._level;
  }
}
