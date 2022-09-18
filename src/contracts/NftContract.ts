import { INftItem } from "@/_types_";
import { BigNumber, ethers } from "ethers";
import { Erc721 } from "./interfaces";
import { getNFTAbi } from "./utils/getAbis";
import { getNFTAddress } from "./utils/getAddress";

export default class NftContract extends Erc721 {
  constructor(provider: ethers.providers.Web3Provider) {
    super(provider, getNFTAddress(), getNFTAbi())
  }

  private _listTokenIds = async(address: string)=> {
    const urls: BigNumber[] = await this._contract.listTokenIds(address);
    const ids = await Promise.all(urls.map((id) => this._toNumber(id)));
    return ids;
  }

  getListNFT = async(address: string): Promise<INftItem[]> => {
    const ids = await this._listTokenIds(address);
    return Promise.all(
      ids.map(async(id) => {        
        const tokenUrl = await this._contract.tokenURI(id);        
        const obj = await (await fetch(`${tokenUrl}.json`)).json();
        const item: INftItem = {...obj, id}
        return item;
      })
    );
  }

  getNftInfo = async(nfts: Array<any>) => {
    return Promise.all(
      nfts.map(async(o: any) => {        
        const tokenUrl = await this._contract.tokenURI(o.tokenId);        
        const obj = await (await fetch(`${tokenUrl}.json`)).json();
        const item: INftItem = {...obj, id: o.tokenId, author: o.author}
        return item;
      })
    );
  }

}