import { Hero } from './hero';

export type HeroWithoutId = Omit<Hero, 'id'>;
