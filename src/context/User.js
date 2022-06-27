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
  // erc20
  erc20Contract = {};
  erc20Name = "";
  erc20TotalSupply = "";
  erc20Decimals = 18;
  erc20Symbol = "";
  erc20Address = "";
  // lending
  lendingContract = {};
  priceFeedAddress = "";
  // snackbars
  addTokenSuccessSnackbar = false;
  errorSnackbar = false;

  async setErrorSnackbar(errorSnackbar) {
    this.errorSnackbar = errorSnackbar;
  }

  async setAddTokenSuccessSnackbar(addTokenSuccessSnackbar) {
    this.addTokenSuccessSnackbar = addTokenSuccessSnackbar;
  }

  async setPriceFeedAddress(priceFeedAddress) {
    this.priceFeedAddress = priceFeedAddress;
  }

  async setERC20Address(erc20Address) {
    this.erc20Address = erc20Address;
  }

  async setERC20Symbol(erc20Symbol) {
    this.erc20Symbol = erc20Symbol;
  }

  async setERC20Decimals(erc20Decimals) {
    this.erc20Decimals = erc20Decimals;
  }

  async setERC20Name(erc20Name) {
    this.erc20Name = erc20Name;
  }

  async setERC20TotalSupply(erc20TotalSupply) {
    this.erc20TotalSupply = erc20TotalSupply;
  }

  async setLendingContract(lendingContract) {
    this.lendingContract = lendingContract;
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
