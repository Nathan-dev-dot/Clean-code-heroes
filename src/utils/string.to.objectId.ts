import { ObjectID } from 'mongodb';

export function strToObjectId(id: string): ObjectID {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('mongodb').ObjectId(id);
}
