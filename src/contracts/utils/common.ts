export type AddressType  = {
  97: string;
  56: string;
}

export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 56,
}

export default function getChainIdFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!env) { return 97;}
  return parseInt(env);
}


export const getRPC = () => {
  if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
    return process.env.NEXT_PUBLIC_RPC_MAINNET;
  return process.env.NEXT_PUBLIC_RPC_TESTNET;
}
export const SMART_ADDRESS = {
  CROWD_SALE: {97: '0xA2FE414E565511f754Fa62DAdD4aA494e55683bB', 56: ''},
  USDT: {97: '0xDc2229777a34798c9eE7E05dFCee2B4d2AfDcbfc', 56: ''},
  NFT: {97: '0xeFe14Edd8adb233784A3124F39B31367d7066E61', 56: ''},
  MARKET: {97: '0x52620b7782F2217De0fA3f0193224cfb1DF7Ba8F', 56: ''},
  AUCTION: {97: '0x9eC705fEF884bdB6382507B3CA544e21FBB66177', 56: ''},
  IPT: {97: '0xBfF3cC27180E6425377c55D7bDC069D18Ae7d99d', 56: ''}
}