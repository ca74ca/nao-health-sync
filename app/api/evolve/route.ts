import { connectDB } from "@/lib/mongo";
import { updateTokenURI } from "@/lib/nft";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { walletId, source = "apple" } = await req.json();

    if (!walletId) {
      return NextResponse.json({ error: "Missing walletId" }, { status: 400 });
    }

    // 1. Connect to DB and find user
    const db = await connectDB();
    const users = db.collection("users");
    const user = await users.findOne({ walletId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { healthSummary, passportId, xp = 0 } = user;

    if (!healthSummary) {
      return NextResponse.json({ error: "No health data found for user" }, { status: 400 });
    }
    if (!passportId) {
      return NextResponse.json({ error: "No NFT passport linked to user" }, { status: 400 });
    }

    // 2. Calculate XP and Level
    const steps = healthSummary.steps ?? 0;
    const newXp = xp + steps * 0.001;
    const newLvl = Math.floor(newXp / 10);

    const metadata = {
      name: `NAO Passport Level ${newLvl}`,
      description: `Health data synced from ${source}.`,
      attributes: [
        { trait_type: "Level", value: newLvl },
        { trait_type: "XP", value: newXp },
        { trait_type: "Source", value: source },
        { trait_type: "Steps", value: steps },
      ],
    };

    // 3. Update XP in DB
    await users.updateOne({ walletId }, { $set: { xp: newXp } });

    // 4. Update NFT
    const nftResult = await updateTokenURI(passportId, metadata);

    // 5. Respond
    return NextResponse.json({
      status: "success",
      updatedLevel: newLvl,
      updatedXp: newXp,
      nftResult,
    });
  } catch (err) {
    console.error("❌ Evolve API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
