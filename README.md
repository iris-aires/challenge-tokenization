# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

> [!NOTE]
> 🤖 Scaffold-ETH 2 is AI-ready! It has everything agents need to build on Ethereum. Check `.agents/`, `.claude/`, `.opencode` or `.cursor/` for more info.

⚙️ Built using NextJS, RainbowKit, Foundry, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

# 🎟 Tokenization

An ERC-721 NFT dApp: mint collectible NFTs (metadata on IPFS), transfer them to other addresses and inspect onchain ownership (`ownerOf`, `balanceOf`, approvals).

## Quickstart (local)

```sh
yarn install
yarn chain      # terminal 1: local Foundry chain
yarn deploy     # terminal 2: deploy YourCollectible locally
yarn start      # terminal 3: Next.js app → http://localhost:3000
```

Use the burner wallet and the Faucet button (bottom-left) to get test funds, then mint from the `My NFTs` tab and inspect the contract in `Debug Contracts`.

- Contract: `packages/foundry/contracts/YourCollectible.sol`
- Deploy script: `packages/foundry/script/`
- Tests: `yarn test`
- Frontend pages: `packages/nextjs/app/`

## Deploy to a testnet (Sepolia)

```sh
yarn generate                    # create a deployer account (encrypted with a password)
yarn account                     # show address / balances – fund it from a Sepolia faucet
yarn deploy --network sepolia
yarn verify --network sepolia    # Etherscan verification
```

Then point the frontend at Sepolia in `packages/nextjs/scaffold.config.ts` (`targetNetworks: [chains.sepolia]`; optionally `burnerWalletMode: "allNetworks"`).

## Ship the frontend

```sh
yarn vercel:login
yarn vercel            # preview deployment
yarn vercel --prod     # production URL
```

## Configuration

- `ALCHEMY_API_KEY` in `packages/foundry/.env` and `NEXT_PUBLIC_ALCHEMY_API_KEY` in `packages/nextjs/.env.local` (or Vercel env) – use your own keys for production to avoid rate limits.
- `ETHERSCAN_API_KEY` in `packages/foundry/.env` for contract verification.
- `IPFS_API_URL` (optional, nextjs) – pinning proxy used by `/api/ipfs/*`; defaults to a public proxy, point it at your own service for production.

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.