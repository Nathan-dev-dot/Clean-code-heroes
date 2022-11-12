export class HeroSpecificationBySpeciality {
  private readonly _specifications = {
    Tank: {
      pv: 1000,
      power: 100,
      armour: 20,
    },
  };

  public specifications(): {
    Tank: { pv: number; power: number; armour: number };
  } {
    return this._specifications;
  }
}
