import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import { getRPC } from "./utils/common";
import { getCrowdSaleAbi } from "./utils/getAbis";
import { getCrowdSaleAddress } from "./utils/getAddress";

export default class CrowSaleContract extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getCrowdSaleAddress(), getCrowdSaleAbi());
    if (!provider) {
      this._contract = new ethers.Contract(this._contractAddress,  this._abis, rpcProvider);
    }
  }

  async getBnbRate(): Promise<number> {
    let rate = await this._contract.BNB_rate();
    return this._toNumber(rate);
  }

  async getUsdtRate(): Promise<number> {
    const rate = await this._contract.USDT_rate();
    return this._toNumber(rate);
  }

  async buyTokenByBNB(amount: number) {
    const rate = await this.getBnbRate();
    const tx: TransactionResponse = await this._contract.buyTokenByBNB({
      ...this._option,
      value: this._numberToEth(amount/rate),
    });
    return this._handleTransactionResponse(tx);
  }

  async buyTokenByUSDT(amount: number) {
    const rate = await this.getUsdtRate();
    const test = amount / rate;
    const tx: TransactionResponse = await this._contract.buyTokenByUSDT(
      this._numberToEth(amount/rate),
      this._option
    );
    return this._handleTransactionResponse(tx);
  }
}
