import { useState } from "react";
import { Collectible } from "./MyHoldings";
import { Address, AddressInput } from "@scaffold-ui/components";
import { isAddress } from "viem";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldWriteContract, useTargetNetwork } from "~~/hooks/scaffold-eth";

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  const { targetNetwork } = useTargetNetwork();
  const [transferToAddress, setTransferToAddress] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "YourCollectible" });

  const handleTransfer = async () => {
    if (!isAddress(transferToAddress) || isTransferring) return;
    setIsTransferring(true);
    try {
      await writeContractAsync({ functionName: "transferFrom", args: [nft.owner, transferToAddress, BigInt(nft.id)] });
      setTransferToAddress("");
    } catch (err) {
      console.error("Error transferring NFT", err);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <article className="exchange-panel overflow-hidden">
      <div className="exchange-art relative aspect-square">
        {nft.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={nft.image}
            alt={nft.name || `Collectible ${nft.id}`}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <div className="exchange-muted flex size-full items-center justify-center text-sm">Artwork unavailable</div>
        )}
        <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[10px] font-medium text-white">
          ERC-721 · #{nft.id}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold leading-6">{nft.name || `Collectible #${nft.id}`}</h3>
        <p className="exchange-muted mt-2 text-xs leading-5">
          {nft.description || "Onchain collectible with IPFS metadata."}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {nft.attributes?.map((attr, index) => (
            <span
              key={`${attr.trait_type}-${index}`}
              className="rounded border border-base-300 bg-base-200 px-2 py-1 text-[10px] exchange-muted"
              title={attr.trait_type}
            >
              {attr.value}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-2 border-y border-base-300 py-3">
          <span className="exchange-muted text-xs">Owner</span>
          <Address address={nft.owner} chain={targetNetwork} />
        </div>
        <div className="mt-4">
          <div className="exchange-muted mb-2 text-xs">Recipient address</div>
          <AddressInput value={transferToAddress} placeholder="0x…" onChange={setTransferToAddress} />
        </div>
        <button
          type="button"
          className="btn btn-secondary mt-3 w-full text-xs"
          onClick={handleTransfer}
          disabled={!isAddress(transferToAddress) || isTransferring}
        >
          {isTransferring ? (
            <>
              <span className="loading loading-spinner loading-xs" />
              Transferring…
            </>
          ) : (
            <>
              Transfer NFT <ArrowUpRightIcon className="size-3.5" />
            </>
          )}
        </button>
      </div>
    </article>
  );
};
