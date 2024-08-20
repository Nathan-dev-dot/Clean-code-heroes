export class HeroSpecificationBySpeciality {
  private readonly _specifications = {
    Tank: {
      pv: 1000,
      power: 100,
      armour: 20,
    },

    Assassin: {
      pv: 800,
      power: 150,
      armour: 5,
    },

    Sorcerer: {
      pv: 700,
      power: 150,
      armour: 10,
    },
  };

  public specifications() {
    return this._specifications;
  }
}
