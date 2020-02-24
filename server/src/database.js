import Datastore from 'nedb';
import { promisify } from 'util';

const promisifyAll = (obj) => Object
  .keys(Object.getPrototypeOf(obj)).reduce((acc, functionName) => {
    acc[functionName] = promisify(obj[functionName]).bind(obj);
    return acc;
  }, {});

const handler = {};

handler.database = {};

handler.init = async (filename) => {
  const db = new Datastore({ filename });
  const dbp = promisifyAll(db);

  await dbp.loadDatabase();

  handler.database = dbp;
  global.database = handler.database;
};

export default handler;
