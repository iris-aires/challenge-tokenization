"use client";

import { useState } from "react";
import { MyHoldings } from "./_components";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/tokenization/ipfs-fetch";
import nftsMetadata from "~~/utils/tokenization/nftsMetadata";

const MyNFTs: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "YourCollectible" });
  const [isMinting, setIsMinting] = useState(false);

  const { data: tokenIdCounter } = useScaffoldReadContract({
    contractName: "YourCollectible",
    functionName: "tokenIdCounter",
    watch: true,
  });

  const handleMintItem = async () => {
    // circle back to the zero item if we've reached the end of the array
    if (tokenIdCounter === undefined) return;

    const tokenIdCounterNumber = Number(tokenIdCounter);
    const currentTokenMetaData = nftsMetadata[tokenIdCounterNumber % nftsMetadata.length];
    setIsMinting(true);
    const notificationId = notification.loading("Uploading to IPFS");

    let uploadedItem;
    try {
      uploadedItem = await addToIPFS(currentTokenMetaData);
    } catch (error) {
      notification.remove(notificationId);
      notification.error(`Error uploading to IPFS: ${error instanceof Error ? error.message : error}`);
      console.error(error);
      setIsMinting(false);
      return;
    }

    // First remove previous loading notification and then show success notification
    notification.remove(notificationId);
    notification.success("Metadata uploaded to IPFS");

    try {
      await writeContractAsync({
        functionName: "mintItem",
        args: [connectedAddress, uploadedItem.path],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsMinting(false);
    }
  };

  const nextDesign =
    tokenIdCounter !== undefined ? nftsMetadata[Number(tokenIdCounter % BigInt(nftsMetadata.length))] : undefined;

  return (
    <div className="exchange-container py-10 sm:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="exchange-kicker exchange-muted mb-3">Portfolio</div>
          <h1 className="text-3xl font-semibold sm:text-4xl">My assets</h1>
          <p className="exchange-muted mt-3 text-sm">Your collectibles, held directly in your wallet.</p>
        </div>
        <a
          href="https://sepolia.etherscan.io"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-primary"
        >
          Sepolia Etherscan ↗
        </a>
      </div>
      <section className="exchange-panel mb-10 flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="mb-2 text-xs font-medium text-primary">FANTASY CHARACTERS</div>
          <h2 className="text-xl font-semibold">Add a character to your collection</h2>
          <p className="exchange-muted mt-3 max-w-lg text-sm leading-6">
            {nextDesign ? `Next design: ${nextDesign.name}. ` : "Connect your wallet to get started. "}Mint on Sepolia
            using test ETH. Your NFT metadata is stored on IPFS.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          {!isConnected || isConnecting ? (
            <RainbowKitCustomConnectButton />
          ) : (
            <button
              type="button"
              className="btn btn-primary h-12 min-w-40 px-6"
              onClick={handleMintItem}
              disabled={isMinting || tokenIdCounter === undefined}
            >
              {isMinting ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  Minting…
                </>
              ) : (
                "Mint NFT"
              )}
            </button>
          )}
          <span className="exchange-muted text-[11px]">ERC-721 · 10 character designs</span>
        </div>
      </section>
      <div className="mb-5 flex items-center gap-3 border-b border-base-300 pb-4">
        <h2 className="text-lg font-semibold">Your collectibles</h2>
        <span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">ONCHAIN</span>
      </div>
      <MyHoldings />
    </div>
  );
};

export default MyNFTs;
