import { MongoClient, ServerApiVersion } from "mongodb";


export const client = new MongoClient(process.env.MONGO_URI ?? "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});