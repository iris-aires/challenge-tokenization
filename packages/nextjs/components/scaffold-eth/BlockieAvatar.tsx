"use client";

import { AvatarComponent } from "@rainbow-me/rainbowkit";
import { getAddressAvatar } from "~~/utils/addressAvatar";

// Preserve ENS avatars and use a smooth address-based gradient as the fallback.
export const BlockieAvatar: AvatarComponent = ({ address, ensImage, size }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={ensImage || getAddressAvatar(address)}
    width={size}
    height={size}
    alt={`${address} avatar`}
    className="shrink-0 rounded-full object-cover ring-1 ring-white/15"
  />
);
