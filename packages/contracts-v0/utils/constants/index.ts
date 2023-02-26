import { ethers } from 'hardhat';
export * from './error';
export const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
export const ONE_GWEI = 1_000_000_000;
export const { HARDHAT_NETWORK } = process.env;
export const Network = HARDHAT_NETWORK || 'hardhat';
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';