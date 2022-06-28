import { makeAutoObservable } from "mobx";

class User {
  constructor() {
    makeAutoObservable(this);
  }

  isContractOwner = false;
  walletAddress = "";
  provider = {};
  chainId = "";
  networkVersion = 0;
  networkName = "";
  // inputs
  depositAmountInput = "";
  // state
  connectToWallet = false;
  getContractInfo = false;
  initialLoad = false;
  // dialogs
  settingsDialog = false;
  depositDialog = false;
  withdrawDialog = false;
  // lending
  lendingContract = {};
  priceFeedAddress = "";
  totalAllowedTokens = 0;
  approvedTokens = [];
  // erc20
  erc20Address = "";
  // snackbars
  addTokenSuccessSnackbar = false;
  errorSnackbar = false;
  depositSuccessSnackbar = false;

  async setDepositSuccessSnackbar(depositSuccessSnackbar) {
    this.depositSuccessSnackbar = depositSuccessSnackbar;
  }

  async setDepositAmountInput(depositAmountInput) {
    this.depositAmountInput = depositAmountInput;
  }

  async setDepositDialog(depositDialog) {
    this.depositDialog = depositDialog;
  }

  async setWithdrawDialog(withdrawDialog) {
    this.withdrawDialog = withdrawDialog;
  }

  async setERC20Address(erc20Address) {
    this.erc20Address = erc20Address;
  }

  async setIsContractOwner(isContractOwner) {
    this.isContractOwner = isContractOwner;
  }

  async setApprovedTokens(approvedTokens) {
    this.approvedTokens = approvedTokens;
  }

  async setConnectToWallet(connectToWallet) {
    this.connectToWallet = connectToWallet;
  }

  async setGetContractInfo(getContractInfo) {
    this.getContractInfo = getContractInfo;
  }

  async setTotalAllowedTokens(totalAllowedTokens) {
    this.totalAllowedTokens = totalAllowedTokens;
  }

  async setErrorSnackbar(errorSnackbar) {
    this.errorSnackbar = errorSnackbar;
  }

  async setAddTokenSuccessSnackbar(addTokenSuccessSnackbar) {
    this.addTokenSuccessSnackbar = addTokenSuccessSnackbar;
  }

  async setPriceFeedAddress(priceFeedAddress) {
    this.priceFeedAddress = priceFeedAddress;
  }

  async setLendingContract(lendingContract) {
    this.lendingContract = lendingContract;
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
