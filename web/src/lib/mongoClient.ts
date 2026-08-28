// Raw MongoClient for the NextAuth MongoDB adapter (verification tokens, accounts).
// Falls back to a local URI so builds/prerenders don't require live credentials;
// nothing connects until a query actually runs.
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/driving-dev";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

const client = global._mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV === "development") global._mongoClient = client;

export default client;
