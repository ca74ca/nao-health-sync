const uri = process.env.MONGODB_URI;
console.log("🔍 Loaded MONGODB_URI:", uri); // <- add this log

if (!uri) {
  throw new Error("❌ MONGODB_URI is missing from .env.local");
}

import { Db, MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB_NAME || "nao";

// Global is used here to preserve the value across hot reloads in development (Next.js)
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env");
}

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise!;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectDB(): Promise<Db> {
  try {
    const client = await clientPromise;
    return client.db(dbName);
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    throw err;
  }
}