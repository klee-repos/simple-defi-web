import { makeAutoObservable } from "mobx";

class User {
  constructor() {
    makeAutoObservable(this);
  }

  walletAddress = "";
  provider = {};
  chainId = "";
  networkVersion = 0;
  networkName = "";
  // state
  initialLoad = false;
  // dialogs
  settingsDialog = false;
  // contracts
  erc20Contract = {};
  erc20Name = "";
  erc20TotalSupply = "";
  LendingContract = {};

  async setERC20Name(erc20Name) {
    this.erc20Name = erc20Name;
  }

  async setERC20TotalSupply(erc20TotalSupply) {
    this.erc20TotalSupply = erc20TotalSupply;
  }

  async setLendingContract(LendingContract) {
    this.LendingContract = LendingContract;
  }

  async setERC20Contract(erc20Contract) {
    this.erc20Contract = erc20Contract;
  }

  async setSettingsDialog(settingsDialog) {
    this.settingsDialog = settingsDialog;
  }

  async setInitialLoad(initialLoad) {
    this.initialLoad = initialLoad;
  }

  async setNetworkName(networkName) {
    this.networkName = networkName;
  }

  async setNetworkVersion(networkVersion) {
    this.networkVersion = networkVersion;
  }

  async setChainId(chainId) {
    this.chainId = chainId;
  }

  async setProvider(provider) {
    this.provider = provider;
  }

  async setWalletAddress(walletAddress) {
    this.walletAddress = walletAddress;
  }
}

export default User;
