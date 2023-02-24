# Web3 Adoption Tool

## Abstract

In today's World crypto assets and blockchain technology have gain massive amount of traction for an array of reasons amoung them are contries like El Salvador, Brasil, China, India by adopting and inviting it's development have demostrated that crypto is here to stay. 

It is safe to say that crypto and blockchain technology is here to stay because the blockchain is an intersection of democracy and technology enableling humanity to create systems that can assure democracy applying cryptographic techniques, game theory schemas and software development.

The fact that humanity has created an alternative financial system free from traditional institutions. That is democratized, censored-proof and trustless through peer to peer transactions is very revoluationary. 

The problem that is facing today is the way that users interact with the blockchain.  It tedious and hard for non-technical people adopt this revoluationary and game changing technology.

We can do better by creating tools that are simple, smooth and seemless to use.

What if there were a platform where non tecnical user can interact with the blockchain through user friendly application.

## Objective

Create a tool that enables nontechnical users deploy smart contracts without at first paying fees.


- **Consumer user**
  - As a consumer user, I would like to create and deploy an ERC standard smart contract.
  - As a consumer user, I would like configure the data of a smart contract to be deployed.
  - As a consumer user, I would like deploy an smart contract without paying fees.
  - As a consumer user, I would like to only interact with an API endpoint and contract address/ENS.
  - As a consumer user, I would like to select the network in which I wish to deploy the contract.
  - As a consumer user, I would like to create a passwordless account which later can be set.
  - As a consumer user, I would like to create custodial wallet that will own my contract until transfered to a non-custodial wallet.
  - As a consumer user, I would like calculate gas fees for a transfer ownership of the contract to another address/ENS.
  - As a consumer user, I would like in one single transaction transfer the ownership of the contract an address.

- **Admin user**
    - As an admin user, I would like to view a list the contracts that have been deployed.


## Scope of Work

- **Software Architecture** - Translate functional spec into fleshed out requirements doc & roadmap.
  - Create User Stories
  - Layout Milestones & Tech Specs

- **Frontend**
    - UI to interact with contract factory API.
    - UI dashboard to view and interact with contracts.
    - UI list of contracts deployed.

- **Backend**
    - Create custodial wallet
    - Deploy a contract with custodial wallet.
    - API Call/Endpoint that retrieves a list of contracts.
  
- **Testing** 
    - Tests for api endpoints.
    - Tests for contracts.
    - Tests for UI.

- **Smart Contracts** - Write a contract factory that is going to deploy a contract standard.


## Milestones

0 - **Design Sprint**
  - Create User Stories
  - Layout Milestones & Tech Specs

1 - **Consumer Backend**
  - Write a contract to mint NFT 
  - Write a contract function that airdrops NFTs to the contacts in a CSV file that includes the name of the attendee, email, wallet address, Yes or No whether they attended the event and how long they attended the event for.
  - Write tests for contract functions/actions such as: Mint, Airdrop.
 
2 - **Consumer Frontend**
  - UI/Screen for NFT Minting and Airdrop to a specific list of accounts based on the attendees list criteria.
  - Users would need to connect the wallet. 


3 - **Admin Backend**
  - Write API Call/Endpoint that retrieves a list of deployed contract with corresponding owner username or wallet address.
  - Write test for API Endpoint.

4 - **Admin Frontend**

  - UI/Screen where the user will view a list of deployed contracts.  


## Budget - TBD

The following is an estimate based on the Scope of Work as currently stated and can change if either are revised.

**Term**: March 1st - April 31st, 2023

| **Start Date** | **Milestone #** | **Development time** | Cost |
| - | - | - | - | - |-|
| March 1st &nbsp; &nbsp;| 0 | X hr | X ETH/USDC/USDT/DAI
| March 15th &nbsp;| 1 | X hr | X ETH/USDC/USDT/DAI
| March 29th | 2 | X hr | X ETH/USDC/USDT/DAI
| April 24th &nbsp;&nbsp; | 3 | X hr | X ETH/USDC/USDT/DAI
| May 31st &nbsp;&nbsp;&nbsp; | 4 | X hr | X ETH/USDC/USDT/DAI
**Total Budget**: $X,XXX
