import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../backend/db"; // ✅ Corrected import

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body as { email?: string };
  if (!email) {
    return res.status(400).json({ error: "Missing email" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("nao"); // Replace with your DB name if different
    const users = db.collection("users");

    const result = await users.updateOne(
      { email },
      {
        $set: {
          appleHealthLinked: true,
          appleHealthBgSync: false,
          updatedAt: new Date(),
        },
      },
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ status: "linked" });
  } catch (err) {
    console.error("❌ link-apple error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
