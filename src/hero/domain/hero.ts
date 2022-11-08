import { HeroSpecialties } from './hero.specialties';
import { HeroRarities } from './hero.rarities';
import { HeroProps } from './hero.props';

export class Hero implements HeroProps {
  private readonly _id?: string;

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

  //<editor-fold desc='getter and setter'>
  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _healthPoints: number;

  get healthPoints(): number {
    return this._healthPoints;
  }

  set healthPoints(value: number) {
    this._healthPoints = value;
  }

  private _experiencePoints: number;

  get experiencePoints(): number {
    return this._experiencePoints;
  }

  set experiencePoints(value: number) {
    this._experiencePoints = value;
  }

  private _power: number;

  get power(): number {
    return this._power;
  }

  set power(value: number) {
    this._power = value;
  }

  private _armour: number;

  get armour(): number {
    return this._armour;
  }

  set armour(value: number) {
    this._armour = value;
  }

  private _specialty: HeroSpecialties;

  get specialty(): HeroSpecialties {
    return this._specialty;
  }

  set specialty(value: HeroSpecialties) {
    this._specialty = value;
  }

  private _rarity: HeroRarities;

  get rarity(): HeroRarities {
    return this._rarity;
  }

  set rarity(value: HeroRarities) {
    this._rarity = value;
  }

  private _level: number;

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get id(): string {
    return this._id;
  }

  //</editor-fold>
}
