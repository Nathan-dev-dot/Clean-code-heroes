import { ObjectID } from 'mongodb';

export function strToObjectId(id: string): ObjectID {
  return ObjectID(id);
}
