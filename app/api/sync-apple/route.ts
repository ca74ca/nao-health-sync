import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI!;

// --- Singleton MongoClient for serverless ---
let clientPromise: Promise<MongoClient>;
if (!globalThis._mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No data received." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("nao");
    const collection = db.collection("appleHealthData");

    const timestampedEntry = {
      ...data,
      syncedAt: new Date().toISOString(),
    };

    await collection.insertOne(timestampedEntry);

    return NextResponse.json({ success: true, message: "Apple Health data stored." });
  } catch (err: any) {
    console.error("❌ Apple Health Sync Error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

// Add to global type (for TypeScript)
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}