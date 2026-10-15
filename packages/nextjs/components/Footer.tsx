import Link from "next/link";
import { hardhat } from "viem/chains";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

export const Footer = () => {
  const { targetNetwork } = useTargetNetwork();
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-100">
      <div className="exchange-container flex flex-wrap items-center justify-between gap-5 py-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight">
            <Square3Stack3DIcon className="size-5 text-primary" />
            TOKENIZATION
          </Link>
          <p className="exchange-muted mt-3 text-xs">Digital collectibles on Ethereum. Built with Scaffold-ETH 2.</p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-xs">
          <a
            className="exchange-muted hover:text-primary"
            href="https://github.com/iris-aires/nft-images"
            target="_blank"
            rel="noreferrer"
          >
            Artwork collection ↗
          </a>
          <Link className="exchange-muted hover:text-primary" href="/debug">
            Contract explorer
          </Link>
        </div>
      </div>
      <div className="exchange-container flex flex-wrap items-center justify-between gap-3 border-t border-base-300 py-4 text-[11px] exchange-muted">
        <span>{targetNetwork.name} · Testnet collectibles</span>
        <span>Minting requires test ETH for network gas.</span>
        {targetNetwork.id === hardhat.id && (
          <div className="flex items-center gap-3">
            <Faucet />
            <Link href="/blockexplorer" className="text-primary">
              Local block explorer
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
};
