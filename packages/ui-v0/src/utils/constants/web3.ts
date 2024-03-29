export const enum ChainId {
  MAINNET = "0x1",
  GOERLI = "0x5",
  MUMBAI = "0x13881",
  MATIC = "0x89",
}

export type ChainInfo = {
  [key in ChainId]: { id: ChainId; name: string };
};

const mainnet = {
  id: ChainId.MAINNET,
  name: "Ethereum Mainnet",
};

const goerli = {
  id: ChainId.GOERLI,
  name: "Goerli Testnet",
};

const mumbai = {
  id: ChainId.MUMBAI,
  name: "Mumbai Testnet",
};

const matic = {
  id: ChainId.MATIC,
  name: "Matic Mainnet",
};

export const SUPPORTED_CHAINS = [
  ChainId.MAINNET,
  ChainId.GOERLI,
  // ChainId.MUMBAI,
  // ChainId.MATIC
];

export const CHAIN_INFO: ChainInfo = {
  [ChainId.MAINNET]: mainnet,
  [ChainId.GOERLI]: goerli,
  [ChainId.MUMBAI]: mumbai,
  [ChainId.MATIC]: matic,
};

export const SUPPORTED_CONTRACTS = [
  {
    name: "ERC20",
    type: "ERC20",
  },
  {
    name: "ERC721",
    type: "ERC721",
  },
];
