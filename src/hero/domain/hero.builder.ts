import { HeroSpecialties } from './hero.specialties';
import { HeroRarities } from './hero.rarities';
import { Hero } from './hero';
import { HeroSpecificationBySpeciality } from './hero.specification.by.speciality';
import { ErrorsCodesHero } from '../application/exceptions/errors.codes.hero';
import { ObjectID } from 'mongodb';

export class HeroBuilder {
  private _id: ObjectID;
  private _name: string = undefined;
  private _healthPoints = 0;
  private _experiencePoints = 0;
  private _power = 0;
  private _armour = 0;
  private _specialty: HeroSpecialties = undefined;
  private _rarity: HeroRarities = undefined;
  private _level = 1;
  private specifications = this.heroSpecifications.specifications();

  constructor(private heroSpecifications: HeroSpecificationBySpeciality) {}

  public id(id: ObjectID): HeroBuilder {
    this._id = id;
    return this;
  }

  public name(name: string): HeroBuilder {
    this._name = name;
    return this;
  }

  public specialty(speciality: string): HeroBuilder {
    this._specialty = HeroSpecialties[speciality]
      ? HeroSpecialties[speciality]
      : undefined;
    return this;
  }

  public setStandardHealthPointsPowerAndArmour(): HeroBuilder {
    this.healthPoints(undefined);
    this.power(undefined);
    this.armour(undefined);
    return this;
  }

  public healthPoints(healthPoints: number): HeroBuilder {
    this._healthPoints = healthPoints
      ? this.computeHealthPoint(healthPoints)
      : this.specifications[this._specialty]
      ? this.computeHealthPoint(undefined)
      : 0;
    return this;
  }

  public power(power: number): HeroBuilder {
    this._power = power
      ? this.computePower(power)
      : this.specifications[this._specialty]
      ? this.computePower(undefined)
      : 0;
    return this;
  }

  public armour(armour: number): HeroBuilder {
    this._armour = armour
      ? this.computeArmour(armour)
      : this.specifications[this._specialty]
      ? this.computeArmour(undefined)
      : 0;
    return this;
  }

  public experiencePoints(experiencePoints: number): HeroBuilder {
    this._experiencePoints = experiencePoints;
    return this;
  }

  public level(level: number): HeroBuilder {
    this._level = level;
    return this;
  }

  public rarity(rarity: string): HeroBuilder {
    this._rarity = HeroRarities[rarity] ? HeroRarities[rarity] : undefined;
    return this;
  }

  public build(): Hero | number {
    if (this.checkHeroBuilder()) return ErrorsCodesHero.InvalidArgument;

    return new Hero({
      id: this._id ? this._id : undefined,
      armour: this._armour,
      experiencePoints: this._experiencePoints ? this._experiencePoints : 1,
      healthPoints: this._healthPoints,
      level: this._level ? this._level : 1,
      name: this._name,
      power: this._power,
      rarity: this._rarity,
      specialty: this._specialty,
    });
  }

  private computeArmour(armour: number) {
    let computeArmour = armour
      ? armour
      : this.specifications[this._specialty].armour;

    if (this._rarity == 'Rare') computeArmour *= 1.1;
    else if (this._rarity == 'Legendary') computeArmour *= 1.2;
    return computeArmour;
  }

  private computeHealthPoint(healthPoint: number) {
    let computeHealthPoints = healthPoint
      ? healthPoint
      : this.specifications[this._specialty].pv;

    if (this._rarity == 'Rare') computeHealthPoints *= 1.1;
    else if (this._rarity == 'Legendary') computeHealthPoints *= 1.2;
    return computeHealthPoints;
  }

  private computePower(power: number) {
    let computePower = power
      ? power
      : this.specifications[this._specialty].power;

    if (this._rarity == 'Rare') computePower *= 1.1;
    else if (this._rarity == 'Legendary') computePower *= 1.2;
    return computePower;
  }

  private checkHeroBuilder() {
    return (
      this._rarity == undefined ||
      this._specialty == undefined ||
      this._healthPoints <= 0 ||
      this._power <= 0 ||
      this._level <= 0 ||
      this._armour <= 0
    );
  }
}
