import { INftItem } from "@/_types_";
import { ethers } from "ethers";
import { Erc721 } from "./interfaces";
import { getRPC } from "./utils/common";
import { getMarketAbi } from "./utils/getAbis";
import { getMarketAddress } from "./utils/getAddress";

export default class MarketContract extends Erc721 {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getMarketAddress(), getMarketAbi())
    if (!provider) {
      this._contract = new ethers.Contract(this._contractAddress,  this._abis, rpcProvider);
    }
  }

  getNFTListedOnMarketplace = async () => {
    const items = await this._contract.getListedNft();   
    const nfts =  items.map((item: any) => ({tokenId: this._toNumber(item.tokenId), author: item.author, price: this._toNumber(item.price)}));
    return nfts;
  }

  getMyNftListed = async(address: string) => {
    const nfts = await this.getNFTListedOnMarketplace();
    return nfts.filter((p: any) => p.author === address);
  }

  listNft = async(tokenId: number, price: number) =>  {
    const tx = await this._contract.listNft(tokenId, this._numberToEth(price), this._option);
    return this._handleTransactionResponse(tx);
  }

  unListNft = async(tokenId: number) =>  {
    const tx = await this._contract.unlistNft(tokenId, this._option);
    return this._handleTransactionResponse(tx);
  }

  buyNft = async(tokenId: number, price: number) => {
    const tx = await this._contract.buyNft(tokenId, this._numberToEth(price), this._option);
    return this._handleTransactionResponse(tx);
  }
}