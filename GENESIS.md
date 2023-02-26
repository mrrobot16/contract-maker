# Web3 Adoption Tool

## Abstract

In today's world, crypto assets and blockchain technology have gained a massive amount of traction for an array of reasons. Countries like El Salvador, Brazil, China, and India have adopted and invited its development, demonstrating that crypto is here to stay.

It is safe to say that crypto and blockchain technology is here to stay because the blockchain is an intersection of democracy and technology, enabling humanity to create systems that can assure democracy by applying cryptographic techniques, game theory schemas, and software development.

The fact that humanity has created an alternative financial system free from traditional institutions that is democratized, censorship-proof, and trustless through peer-to-peer transactions is very revolutionary.

The problem facing us today is the way that users interact with the blockchain. It is tedious and hard for non-technical people to adopt this revolutionary and game-changing technology.

We can do better by creating tools that are simple, smooth, and seamless to use.

What if there were a platform where non-technical users can interact with the blockchain through a user-friendly application?

## Objective

Create a tool that enables non-technical users to deploy smart contracts without first paying fees.

- **Consumer user**
  - As a consumer user, I would like to create and deploy an ERC standard smart contract.
  - As a consumer user, I would like to configure the data of a smart contract to be deployed.
  - As a consumer user, I would like to deploy a smart contract without paying fees.
  - As a consumer user, I would like to only interact with an API endpoint and contract address/ENS.
  - As a consumer user, I would like to select the network in which I wish to deploy the contract.
  - As a consumer user, I would like to create a passwordless account which can later be set.
  - As a consumer user, I would like to create a custodial wallet that will own my contract until transferring to a non-custodial wallet.
  - As a consumer user, I would like to calculate gas fees for transferring ownership of the contract to another address/ENS.
  - As a consumer user, I would like to transfer the ownership of the contract to another address in a single transaction.

- **Admin user**
  - As an admin user, I would like to view a list of the contracts that have been deployed.

## Scope of Work

- **Software Architecture**
  - Translate functional specs into a fleshed-out requirements doc and roadmap.
  - Create user stories.
  - Lay out milestones and tech specs.

- **Frontend**
  - UI/UX of flow for contract deployment. This includes an array of screens and components for each corresponding step.
  - UI/UX for users to connect a non-custodial wallet, e.g. MetaMask.
  - UI dashboard to view and interact with contracts.
  - UI list of contracts deployed.

- **Backend**
  - Service that creates a custodial wallet.
  - API endpoint that deploys a contract with a custodial wallet.
  - API endpoint that retrieves a list of contracts.

- **Testing**
  - Tests for API endpoints.
  - Tests for contracts.
  - Tests for UI.

- **Smart Contracts**
  - Write a proxy contract
  - Write a contract factory
  

  ## Milestones

  0 - **Design Sprint**
    - Create User Stories.
    - Layout Milestones & Tech Specs.

  1 - **Consumer Backend**
    - Write a proxy contract that will be the only contract our client will interact with.
    - Write an endpoint that interacts with the proxy contract.
    - Write a contract that will be a factory for deploying an ERC standard smart contracts.
    - Write a function that will create a wallet.
    - Write a function that will create a user in a database using a wallet address as an ID.
    - Write tests for each contract deployment. ie: ERC20 token contract deployment.
    - Write tests for each contract function/action. ie: Mint ERC20 token contract function call.

  2 - **Consumer Frontend**
    - UI/UX of flow for contract deployment. This includes an array of screens and components for each corresponding step.
    - UI/UX for users to connect a non-custodial wallet. ie: MetaMask.

  3 - **Admin Backend**
    - Write an API endpoint that retrieves a list of deployed contract with the corresponding owner username or wallet address.
    - Write a test for retrieving a list of deployed contracts API endpoint.
  4 - **Admin Frontend**
    - Screen where the user will view a list of deployed contracts. This screen can be consider a dashboard.


## Budget - TBD

The following is an estimate based on the Scope of Work as currently stated and can change if either are revised.

**Term**: March 1st - April 31st, 2023

| **Start Date** | **Milestone #** | **Development time** | Cost |
| - | - | - | - | - |-|
| March 1st &nbsp; &nbsp;| 0 | X hr | X ETH/USDC/USDT/DAI
| March 15th &nbsp;| 1 | X hr | X ETH/USDC/USDT/DAI
| March 29th | 2 | X hr | X ETH/USDC/USDT/DAI
| April 12th | 3 | X hr | X ETH/USDC/USDT/DAI
| April 30th &nbsp;&nbsp; | 4 | X hr | X ETH/USDC/USDT/DAI
**Total Budget**: $X,XXX
