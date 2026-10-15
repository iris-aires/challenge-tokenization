import { DebugContracts } from "./_components/DebugContracts";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Contract Explorer",
  description: "Inspect NFT contract state and interact with read and write methods on Sepolia.",
});

const Debug: NextPage = () => (
  <div className="exchange-container py-10 sm:py-12">
    <div className="exchange-kicker exchange-muted mb-3">Developer tools</div>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold sm:text-4xl">Contract explorer</h1>
        <p className="exchange-muted mt-3 text-sm">
          Inspect contract state, query methods, and submit transactions from your wallet.
        </p>
      </div>
      <span className="rounded border border-base-300 bg-base-100 px-3 py-2 text-[11px] exchange-muted">
        Read calls are free · Write calls require gas
      </span>
    </div>
    <DebugContracts />
  </div>
);

export default Debug;
