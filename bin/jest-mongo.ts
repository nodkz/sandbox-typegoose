import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;
let uri: string;

function initMongo() {
  beforeAll(async () => {
    mongod = new MongoMemoryServer({
      debug: false,
    });
    uri = await mongod.getConnectionString();
    mongoose.connect(uri, {
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    mongoose.disconnect();
    await mongod.stop();
  });
}

export { mongod, uri, initMongo };
