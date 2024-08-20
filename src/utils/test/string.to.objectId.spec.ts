import { strToObjectId } from '../string.to.objectId';
import { ObjectID } from 'mongodb';

describe('HeroService', () => {
  it('should return ObjectId', () => {
    const objectId: ObjectID = strToObjectId('jazrngiauzrg');
    expect(objectId instanceof ObjectID).toBe(true);
  });
});
