"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { JsonEditor } from "~~/components/JsonEditor";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/tokenization/ipfs-fetch";
import nftsMetadata from "~~/utils/tokenization/nftsMetadata";

const IpfsUpload: NextPage = () => {
  const [yourJSON, setYourJSON] = useState<object>(nftsMetadata[0]);
  const [loading, setLoading] = useState(false);
  const [uploadedIpfsPath, setUploadedIpfsPath] = useState("");

  const handleIpfsUpload = async () => {
    setLoading(true);
    const notificationId = notification.loading("Uploading to IPFS...");
    try {
      const uploadedItem = await addToIPFS(yourJSON);
      notification.remove(notificationId);
      notification.success("Uploaded to IPFS");

      setUploadedIpfsPath(uploadedItem.path);
    } catch (error) {
      notification.remove(notificationId);
      notification.error(`Error uploading to IPFS: ${error instanceof Error ? error.message : error}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="exchange-container flex items-stretch flex-col py-10 sm:py-12 gap-4">
        <h1 className="mb-4">
          <span className="block text-3xl font-semibold sm:text-4xl">Upload to IPFS</span>
        </h1>

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
        <button
          className={`btn btn-primary self-start mt-4 ${loading ? "loading" : ""}`}
          disabled={loading}
          onClick={handleIpfsUpload}
        >
          Upload to IPFS
        </button>
        {uploadedIpfsPath && (
          <div className="mt-4 break-all text-sm text-primary">
            <a href={`https://ipfs.io/ipfs/${uploadedIpfsPath}`} target="_blank" rel="noreferrer">
              {`https://ipfs.io/ipfs/${uploadedIpfsPath}`}
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default IpfsUpload;
