import { Hero } from '../domain/hero';
import { HeroRarities } from '../domain/hero.rarities';
import { HeroSpecialties } from '../domain/hero.specialties';
import { UpdateHeroDto } from '../dto/update-hero.dto';

export class MockedHeroRepository {
  private readonly mockedDatabase: Hero[] = [
    new Hero({
      id: '0',
      armour: 20,
      experiencePoints: 1,
      healthPoints: 1000,
      level: 1,
      name: 'Nathan',
      power: 100,
      rarity: HeroRarities.Common,
      specialty: HeroSpecialties.Tank,
    }),
    new Hero({
      id: '1',
      armour: 5,
      experiencePoints: 1,
      healthPoints: 800,
      level: 1,
      name: 'Sarah',
      power: 150,
      rarity: HeroRarities.Rare,
      specialty: HeroSpecialties.Assassin,
    }),
  ];

  async create(hero: Hero): Promise<Hero> {
    const newId = this.mockedDatabase.length.toString();
    const NewHero = new Hero({
      id: newId,
      armour: hero.armour,
      experiencePoints: hero.experiencePoints,
      healthPoints: hero.healthPoints,
      level: hero.level,
      name: hero.name,
      power: hero.power,
      rarity: HeroRarities[hero.rarity],
      specialty: HeroSpecialties[hero.specialty],
    });

    this.mockedDatabase.push(NewHero);
    return this.findOne(newId);
  }

  async findAll(): Promise<Hero[]> {
    return this.mockedDatabase;
  }

  async findOne(id: string): Promise<Hero> {
    return this.mockedDatabase.find((hero) => hero.id == id);
  }

  async remove(id: string) {
    const index = this.mockedDatabase.findIndex((hero) => {
      return hero.id == id;
    });
    if (index > -1) {
      this.mockedDatabase.splice(index, 1);
    }
  }

  async update(id: string, updateHeroDto: UpdateHeroDto) {
    const index = this.mockedDatabase.findIndex((hero) => {
      return hero.id == id;
    });
    if (index != -1) {
      for (const recipientProps of Object.keys(updateHeroDto)) {
        if (updateHeroDto[recipientProps]) {
          this.mockedDatabase[index][recipientProps] =
            updateHeroDto[recipientProps];
        }
      }
    }
  }
}
