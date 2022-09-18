export interface IWalletInfo {
  address: string;
  bnb: number;
}

export interface IRate {
  usdtRate: number;
  bnbRate: number;
}

export enum TOKEN {
  BNB = 'BNB',
  USDT = 'USDT'
}

export interface IPackage {
  key: string;
  name: string;
  amount: number;
  icon: string;
  bg: string; 
  token : TOKEN;
}

export interface IMenu {
  name: string;
  url: string;
}

export interface IAttribute {
  trait_type: string;
  value: string | number;
}

export interface INftItem {
  id: number;
  name?: string;
  description?: string;
  image: string;
  attributes?: IAttribute[];
  //Listing
  priceListing?: number;
  author?: string;
  //Auction
  owner?: string;
  ownerImage?: string;
  highestBid?: number;
}

export enum Clarity {
  "A",
  "B",
  "C",
  "D",
  "E",
  "S",
  "SS",
  "SSS",
}
export type ActionType = "LIST" | "UNLIST" | "TRANSFER" | "AUCTION";