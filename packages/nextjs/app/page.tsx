import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import nftsMetadata from "~~/utils/tokenization/nftsMetadata";

const artworkPreview = (image: string) => `/nft-previews/${image.split("/").pop()?.replace(".png", ".jpg")}`;

const Home = () => {
  const featured = nftsMetadata[0];

  return (
    <div>
      <div className="border-b border-base-300 bg-base-100">
        <div className="exchange-container flex items-center gap-3 py-3 text-xs">
          <span className="size-1.5 shrink-0 rounded-full bg-success" />
          <span className="exchange-muted">Fantasy Characters is live on Sepolia.</span>
          <Link href="/myNFTs" className="ml-auto flex shrink-0 items-center gap-1 font-medium text-primary">
            Mint now <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>

      <section className="exchange-container exchange-hero grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-1">
          <div className="exchange-kicker mb-6 text-primary">Your gateway to digital collectibles</div>
          <h1 className="text-[44px] font-bold leading-[1.08] tracking-[-0.045em] sm:text-6xl xl:text-[72px]">
            Discover art.
            <br />
            Mint your next
            <br />
            <span className="text-primary">onchain asset.</span>
          </h1>
          <p className="exchange-muted mt-6 max-w-md text-base leading-7">
            Explore a world of fantasy characters. Mint, collect, and transfer NFTs directly from your wallet.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/myNFTs" className="btn btn-primary h-12 min-w-40 px-7">
              Start minting <ArrowRightIcon className="size-4" />
            </Link>
            <Link href="#collection" className="btn btn-secondary h-12 px-7">
              Explore collection
            </Link>
          </div>
          <div className="exchange-muted mt-6 flex items-center gap-2 text-xs">
            <ShieldCheckIcon className="size-4 text-success" />
            Your wallet. Your collectibles. Your ownership.
          </div>
        </div>

        <div className="relative z-1 grid grid-cols-[1.1fr_1fr] gap-3 rounded-2xl border border-base-300 bg-base-100/60 p-3 sm:p-4">
          <Link href="/myNFTs" className="overflow-hidden rounded-lg border border-base-300 bg-base-100">
            <div className="exchange-art relative aspect-[.85]">
              <Image
                src={artworkPreview(featured.image)}
                alt={featured.name}
                fill
                priority
                sizes="(max-width: 1024px) 48vw, 260px"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded bg-black/65 px-2 py-1 text-[10px] font-semibold text-white">
                FEATURED
              </span>
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-xs text-primary">Fantasy Characters</p>
              <h2 className="mt-2 text-sm font-semibold sm:text-base">{featured.name}</h2>
              <div className="exchange-muted mt-3 flex items-center justify-between text-xs">
                <span>ERC-721</span>
                <ArrowUpRightIcon className="size-4 text-primary" />
              </div>
            </div>
          </Link>
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-base-300 bg-base-100 p-4">
              <div className="exchange-muted text-[10px] uppercase tracking-widest">Network status</div>
              <div className="mt-2 flex items-center gap-2 font-semibold">
                <span className="size-2 rounded-full bg-success" />
                Sepolia
              </div>
              <div className="exchange-muted mt-2 text-xs">Ethereum testnet</div>
            </div>
            {nftsMetadata.slice(1, 3).map(nft => (
              <Link
                href="/myNFTs"
                key={nft.name}
                className="flex flex-1 items-center gap-3 rounded-lg border border-base-300 bg-base-100 p-3"
              >
                <div className="exchange-art relative aspect-square w-16 shrink-0 rounded-md sm:w-20">
                  <Image src={artworkPreview(nft.image)} alt={nft.name} fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-primary">
                    Collection preview
                  </div>
                  <h2 className="mt-2 text-sm font-semibold leading-5">{nft.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-base-300 bg-base-100/50">
        <dl className="exchange-container grid grid-cols-2 gap-y-7 py-8 md:grid-cols-4">
          {[
            ["10", "Character designs"],
            ["ERC-721", "Token standard"],
            ["IPFS", "Metadata storage"],
            ["Sepolia", "Ethereum testnet"],
          ].map(([value, label]) => (
            <div key={label} className="border-l border-base-300 pl-5 first:border-0 first:pl-0">
              <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{value}</dd>
              <dt className="exchange-muted mt-2 text-xs">{label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section id="collection" className="exchange-container scroll-mt-24 py-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="exchange-kicker mb-3 exchange-muted">Discover</div>
            <h2 className="text-3xl font-semibold">Explore the collection</h2>
            <p className="exchange-muted mt-3 text-sm">
              Ten characters. A new addition to your wallet with every mint.
            </p>
          </div>
          <Link href="/myNFTs" className="flex items-center gap-2 text-sm font-medium text-primary">
            View my assets <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {nftsMetadata.map((nft, index) => (
            <Link href="/myNFTs" key={nft.name} className="exchange-panel exchange-card overflow-hidden">
              <div className="exchange-art relative aspect-square">
                <Image
                  src={artworkPreview(nft.image)}
                  alt={nft.name}
                  fill
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 230px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="exchange-muted text-[10px] font-medium uppercase tracking-wider">
                  Design {String(index + 1).padStart(2, "0")} / 10
                </div>
                <h3 className="mt-2 min-h-10 text-sm font-semibold leading-5">{nft.name}</h3>
                <div className="mt-4 flex items-center justify-between border-t border-base-300 pt-3 text-xs">
                  <span className="exchange-muted">Sepolia NFT</span>
                  <span className="font-medium text-primary">
                    Mint <ArrowUpRightIcon className="inline size-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="exchange-container pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: WalletIcon,
              title: "Connect your wallet",
              text: "Use your Ethereum wallet and switch to the Sepolia network.",
              href: "/myNFTs",
              action: "Open my assets",
            },
            {
              icon: CubeTransparentIcon,
              title: "Make it yours",
              text: "Mint a collectible with a small amount of Sepolia test ETH.",
              href: "/myNFTs",
              action: "Mint an NFT",
            },
            {
              icon: ArrowUpRightIcon,
              title: "Send it anywhere",
              text: "Transfer your NFT to another Ethereum address, directly onchain.",
              href: "/transfers",
              action: "View activity",
            },
          ].map(({ icon: Icon, title, text, href, action }) => (
            <div className="exchange-panel p-6" key={title}>
              <Icon className="mb-5 size-7 text-primary" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="exchange-muted mt-3 text-sm leading-6">{text}</p>
              <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-primary">
                {action}
                <ArrowRightIcon className="size-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
