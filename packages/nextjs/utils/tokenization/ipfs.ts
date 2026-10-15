// IPFS pinning goes through a public pinning proxy, so no IPFS credentials are needed.
// Override with IPFS_API_URL to point at your own pinning service (same /pin + /:cid interface).
const IPFS_API_URL = process.env.IPFS_API_URL ?? "https://speedrunethereum.com/api/ipfs";

const request = async (path: string, init?: RequestInit) => {
  let res: Response;
  try {
    res = await fetch(`${IPFS_API_URL}${path}`, { ...init, signal: AbortSignal.timeout(30_000) });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") throw new Error("IPFS proxy timed out");
    throw error;
  }
  // A non-JSON answer (e.g. a Vercel error page) must not hide the status code
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `IPFS proxy responded ${res.status}`);
  return data;
};

export async function addToIPFS(metadata: object) {
  const { cid } = await request("/pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(metadata),
  });
  // Callers read the CID from `path`
  return { path: cid as string };
}

export async function getNFTMetadataFromIPFS(ipfsHash: string) {
  return request(`/${encodeURIComponent(ipfsHash.trim())}`);
}
