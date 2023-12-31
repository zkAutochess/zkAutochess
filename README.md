# =nil; chronicle

<img src="https://github.com/zkAutochess/zkAutochess/raw/3155ff0bdc7b8415237f59ece3996a81168840f5/files/logo.png" alt="logo" width="500"/>

⚔️ =nil; chronicle is an autobattler game using zk to keep players' choices hidden from their oppononents.

⚙️ Built using =nil; ZKLLVM, TypeScript and Solidity.

- 🧾 **ZK proofs**: Players compute proof that they use a valid strategy and commit to their strategy on-chain. Central Server obtains strategies and determines winner with another ZKP.
- ⛓️ **Smart contracts**: Verifies strategies and winner. After that it distributes tokens to winner (Soon™).
- 🖼️ **Frontend**: Game is generated in browser based on strategies.

## Contents
- [Contents](#contents)
- [Diagram](#diagram)
- [Links](#links)
- [Hackathon bounties](#hackathon-bounties)
- [Team](#team)

## Diagram
![diagram](https://github.com/zkAutochess/zkAutochess/blob/6423819e59e02654b2e04413f7c4d5ecaeed3555/files/schema-red.png)

## Links
- [Deployed game](https://zkhack-frontend-7n5nl.ondigitalocean.app/)
- [Devfolio](https://devfolio.co/projects/nil-chronicle-a5de)
- [Presentation slides]()
- [Deployed contract on Scroll](https://sepolia.scrollscan.com/address/0x1819c40b652e59c335b67e2b2e461e1a98fa20df)
- [Deployed contract on Mantle](https://explorer.testnet.mantle.xyz/address/0x6d377A53dF4e7E73913F460A1E4D2787C867232F)

## Hackathon bounties

#### =nil; Foundation - Solution example with zkLLVM
We incorporate two ZKPs inside our infrastructure, both proofs written and generated with the =nil; toolchain. The first proof verifies that the players chose a valid strategy and computes a Poseidon hash of the input (with a nonce, and the player ID). The second proof is more involved, as it checks the outcome of the game. We reimplemented the game engine in C++ and compiled our circuit from it with zkLLVM.

We additionally tried to produce the EVM verifier from =nil; tooling but this did not fully work (we really tried).

#### Scroll - ZK dapp
Our smart contract is deployed on the Scroll testnet.
- [Smart contract deployment](https://sepolia.scrollscan.com/address/0x1819c40b652e59c335b67e2b2e461e1a98fa20df)
- [Circuit verification transaction](https://sepolia.scrollscan.com/tx/0x92f16416d6dd2048dbadccd6144fdc2501931dad7ca2a10ae81acc234e761a95)

As you can see the transaction is still pending after 12+ hours due to some issues with Scroll testnet.
#### ZK dApp on Mantle
Our smart contract is deployed on the Mantle testnet.
- [Smart contract deployment](https://explorer.testnet.mantle.xyz/address/0x6d377A53dF4e7E73913F460A1E4D2787C867232F)
- [Circuit verification transaction](https://explorer.testnet.mantle.xyz/tx/0xde09596ad82de4ff8a1d96e18f65b9faccfcef2f070794ddcfb928aaa226b336)

## Team
This project was build at ZK Hack Istanbul 2023 by:

- [Alexey Kalmykov](https://twitter.com/0xlexx)
- [Timur Bartenev](https://www.linkedin.com/in/thrmdy/)
- [Themis](https://twitter.com/TACEO_IO)
- [Alexandr Kolesnik](https://t.me/KoshkenS)
- [arjanjohan](https://x.com/arjanjohan/)
