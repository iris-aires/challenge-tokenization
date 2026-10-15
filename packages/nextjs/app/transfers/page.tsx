"use client";

import { Address } from "@scaffold-ui/components";
import type { NextPage } from "next";
import { useScaffoldEventHistory, useTargetNetwork } from "~~/hooks/scaffold-eth";

const Transfers: NextPage = () => {
  const { targetNetwork } = useTargetNetwork();
  const { data: transferEvents, isLoading } = useScaffoldEventHistory({
    contractName: "YourCollectible",
    eventName: "Transfer",
  });

  return (
    <div className="exchange-container py-10 sm:py-12">
      <div className="exchange-kicker exchange-muted mb-3">Onchain activity</div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Transfer history</h1>
          <p className="exchange-muted mt-3 text-sm">Follow the movement of collectibles on {targetNetwork.name}.</p>
        </div>
        <span className="flex items-center gap-2 text-xs exchange-muted">
          <span className="size-1.5 rounded-full bg-success" />
          Onchain events
        </span>
      </div>
      <div className="exchange-panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-base-300 px-6 py-5">
          <h2 className="text-sm font-semibold">All transfers</h2>
          <span className="text-[11px] exchange-muted">YourCollectible · ERC-721</span>
        </div>
        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm exchange-muted" role="status">
            <span className="loading loading-spinner loading-sm text-primary" />
            Loading transfer history…
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table exchange-table w-full">
              <thead className="bg-base-200/60 exchange-muted">
                <tr>
                  <th>Token ID</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {!transferEvents?.length ? (
                  <tr>
                    <td colSpan={3} className="h-48 text-center text-sm exchange-muted">
                      No transfers yet. Mint a collectible to start the activity.
                    </td>
                  </tr>
                ) : (
                  transferEvents.map((event, index) => (
                    <tr key={`${event.transactionHash}-${event.logIndex ?? index}`}>
                      <td className="font-medium text-primary">#{event.args.tokenId?.toString()}</td>
                      <td>
                        <Address address={event.args.from} chain={targetNetwork} />
                      </td>
                      <td>
                        <Address address={event.args.to} chain={targetNetwork} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transfers;
