"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { JsonEditor } from "~~/components/JsonEditor";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/tokenization/ipfs-fetch";

const IpfsDownload: NextPage = () => {
  const [yourJSON, setYourJSON] = useState({});
  const [ipfsPath, setIpfsPath] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIpfsDownload = async () => {
    setLoading(true);
    const notificationId = notification.loading("Getting data from IPFS");
    try {
      const metaData = await getMetadataFromIPFS(ipfsPath);
      notification.remove(notificationId);
      notification.success("Downloaded from IPFS");

      setYourJSON(metaData);
    } catch (error) {
      notification.remove(notificationId);
      notification.error(`Error downloading from IPFS: ${error instanceof Error ? error.message : error}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="exchange-container flex items-stretch flex-col py-10 sm:py-12 gap-4">
        <h1 className="mb-4">
          <span className="block text-3xl font-semibold sm:text-4xl">Download from IPFS</span>
        </h1>
        <div className={`flex w-full max-w-xl overflow-hidden rounded-lg border border-base-300 bg-base-100`}>
          <input
            className="input w-full border-0 bg-transparent px-4 text-sm placeholder:text-base-content/40"
            placeholder="IPFS CID"
            value={ipfsPath}
            onChange={e => setIpfsPath(e.target.value)}
            autoComplete="off"
          />
        </div>
        <button
          className={`btn btn-primary self-start my-2 ${loading ? "loading" : ""}`}
          disabled={loading}
          onClick={handleIpfsDownload}
        >
          Download from IPFS
        </button>

        <JsonEditor
          src={yourJSON}
          enableClipboard={false}
          onEdit={edit => {
            setYourJSON(edit.updated_src);
          }}
          onAdd={add => {
            setYourJSON(add.updated_src);
          }}
          onDelete={del => {
            setYourJSON(del.updated_src);
          }}
        />
      </div>
    </>
  );
};

export default IpfsDownload;
