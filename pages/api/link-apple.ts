import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../backend/db"; // ↔ adjust if your db file lives elsewhere

/**
 * One-time endpoint called **only after the mobile app
 * successfully links Apple Health**.  It sets:
 *   appleHealthLinked = true
 *   appleHealthBgSync = false  (will flip true after task registers)
 *
 * Body: { email: string }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body as { email?: string };

  if (!email) return res.status(400).json({ error: "Missing email" });

  try {
    const result = await db
      .collection("users")
      .updateOne(
        { email },
        {
          $set: {
            appleHealthLinked: true,
            appleHealthBgSync: false,
            updatedAt: new Date(),
          },
        },
        { upsert: false }      // user must already exist
      );

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "User not found" });

    res.status(200).json({ status: "linked" });
  } catch (err) {
    console.error("link-apple error", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
