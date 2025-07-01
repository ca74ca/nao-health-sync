import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
export async function connectDB() {
  try {
    const db = await clientPromise;
    return db.db();
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    throw err;
  }
}