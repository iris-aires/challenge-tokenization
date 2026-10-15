"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hardhat } from "viem/chains";
import { Bars3Icon, ChevronDownIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick, useTargetNetwork } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = { label: string; href: string };

export const menuLinks: HeaderMenuLink[] = [
  { label: "Discover", href: "/" },
  { label: "My Assets", href: "/myNFTs" },
  { label: "Activity", href: "/transfers" },
];
const toolLinks: HeaderMenuLink[] = [
  { label: "IPFS Upload", href: "/ipfsUpload" },
  { label: "IPFS Download", href: "/ipfsDownload" },
  { label: "Contract Explorer", href: "/debug" },
];

export const HeaderMenuLinks = ({ includeTools = false }: { includeTools?: boolean }) => {
  const pathname = usePathname();
  return (
    <>
      {[...menuLinks, ...(includeTools ? toolLinks : [])].map(({ label, href }) => (
        <li key={href}>
          <Link href={href} className="exchange-nav-link" aria-current={pathname === href ? "page" : undefined}>
            {label}
          </Link>
        </li>
      ))}
    </>
  );
};

export const Header = () => {
  const { targetNetwork } = useTargetNetwork();
  const pathname = usePathname();
  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  const toolsRef = useRef<HTMLDetailsElement>(null);
  useOutsideClick(burgerMenuRef, () => burgerMenuRef.current?.removeAttribute("open"));
  useOutsideClick(toolsRef, () => toolsRef.current?.removeAttribute("open"));

  return (
    <header className="exchange-header sticky top-0 z-30">
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 lg:gap-8">
          <Link
            href="/"
            aria-label="Tokenization home"
            className="flex shrink-0 items-center gap-2 text-lg font-extrabold tracking-tight"
          >
            <Square3Stack3DIcon className="size-7 text-primary" />
            <span className="hidden min-[400px]:inline">
              TOKEN<span className="text-primary">IZATION</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center lg:flex">
            <ul className="m-0 flex list-none p-0">
              <HeaderMenuLinks />
            </ul>
            <details className="dropdown" ref={toolsRef}>
              <summary className="exchange-nav-link cursor-pointer list-none">
                Tools <ChevronDownIcon className="size-3" />
              </summary>
              <ul
                className="dropdown-content z-40 mt-1 w-52 rounded-lg border border-[#303138] bg-[#18191e] p-2 shadow-xl"
                onClick={() => toolsRef.current?.removeAttribute("open")}
              >
                {toolLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="exchange-nav-link rounded-md !px-3 !py-3"
                      aria-current={pathname === href ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <SwitchTheme className="text-[#b6b8c0] hover:bg-white/10 hover:text-primary" />
          <span className="hidden items-center gap-2 border-r border-[#303138] pr-4 text-xs text-[#b6b8c0] sm:flex">
            <span className="size-1.5 rounded-full bg-success" />
            {targetNetwork.name}
          </span>
          <RainbowKitCustomConnectButton />
          {targetNetwork.id === hardhat.id && <FaucetButton />}
          <details className="dropdown dropdown-end lg:hidden" ref={burgerMenuRef}>
            <summary className="btn btn-ghost px-2 text-[#f3f4f6]" aria-label="Open navigation">
              <Bars3Icon className="size-6" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="dropdown-content z-40 mt-4 w-60 rounded-lg border border-[#303138] bg-[#18191e] p-2 shadow-xl"
            >
              <ul
                className="m-0 list-none p-0 [&_.exchange-nav-link]:rounded-md [&_.exchange-nav-link]:!py-3"
                onClick={() => burgerMenuRef.current?.removeAttribute("open")}
              >
                <HeaderMenuLinks includeTools />
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
};
