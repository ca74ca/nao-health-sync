export async function updateTokenURI(tokenId: string, metadata: any) {
  console.log("🔗 updateTokenURI called:", tokenId, metadata);

  // TEMP: Simulate Thirdweb update call
  return {
    success: true,
    updated: new Date().toISOString(),
    tokenId,
    metadata,
  };
}