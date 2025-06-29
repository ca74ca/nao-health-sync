export async function syncAppleHealthToBackend(
  walletId: string,
  healthSummary: Record<string, any>
): Promise<any> {
  try {
    const res = await fetch("https://nao-v2.onrender.com/api/sync-apple", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletId, healthSummary }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Backend responded ${res.status}: ${msg}`);
    }

    const data = await res.json();
    console.log("✅ Synced to NAO backend", data);
    return data;
  } catch (err) {
    console.error("❌ Backend sync error:", err);
    throw err; // let caller show an alert if you like
  }
}