import { ethers } from "ethers";
import { BaseInterface, Erc20 } from "./interfaces";
import { getIptAbi } from "./utils/getAbis";
import { getIptAddress } from "./utils/getAddress";

export default class IPTContract extends Erc20 {
  constructor(provider: ethers.providers.Web3Provider) {
    super(provider, getIptAddress(), getIptAbi());
  }
}