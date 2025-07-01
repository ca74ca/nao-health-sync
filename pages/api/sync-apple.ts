import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../backend/db'; // double check this path matches your Mongo connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { walletId, healthSummary } = req.body;

  if (!walletId || !healthSummary) {
    return res.status(400).json({ error: 'Missing walletId or healthSummary' });
  }

  try {
    // Save Apple Health data
    await db.collection('appleHealth').updateOne(
      { walletId },
      { $set: { data: healthSummary, updatedAt: new Date() } },
      { upsert: true }
    );

    // Trigger NFT evolution
    const evolveRes = await fetch(`${process.env.NEXT_PUBLIC_NAO_BACKEND_URL}/api/evolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletId }),
    });

    const evolveData = await evolveRes.json();
    console.log('🎯 Evolve result:', evolveData);

    res.status(200).json({ status: 'success', evolved: evolveData });
  } catch (err) {
    console.error('❌ Error syncing Apple Health:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

