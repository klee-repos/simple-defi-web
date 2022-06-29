// external
import { ethers } from "ethers";
// internal
import { chainIdToNetworkName } from "./NetworkMapping";
import { lendingContractSetup } from "./ContractSetup";
import { erc20ABI } from "../abis/ERC20ABI";

export async function connectWeb3Wallet(user, cookies) {
  try {
    console.log("starting connect...");
    if (typeof window.ethereum != "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      await user.setProvider(provider);
      const signer = user.provider.getSigner();
      await user.setWalletAddress(provider.provider.selectedAddress);
      await user.setChainId(provider.provider.chainId);
      await user.setNetworkVersion(provider.provider.networkVersion);
      await user.setNetworkName(await chainIdToNetworkName(user.chainId));
      await lendingContractSetup(user, signer);
      await user.setConnectToWallet(true);
      cookies.set("connected", `true`);
      // debug
      console.log(`network: ${await chainIdToNetworkName(user.chainId)}`);
    }
  } catch (e) {
    cookies.set("connected", `false`);
    console.log(e);
  }
}

export async function logout(user, cookies) {
  try {
    console.log("hit");
    await user.setProvider({});
    await user.setWalletAddress("");
    await user.setChainId("");
    await user.setNetworkVersion("");
    await user.setNetworkName("");
    await user.setSettingsDialog(false);
    cookies.set("connected", `false`);
    // debug
    console.log(`connected: ${user.walletAddress}`);
  } catch (e) {
    console.log(e);
  }
}

export async function getApprovedTokens(user) {
  let approvedTokenAddresses = [];
  let approvedTokens = [];
  let tokenDrawers = {};
  if (user.totalAllowedTokens > 0) {
    for (let i = 0; i < user.totalAllowedTokens; i++) {
      let tokenAddress = await user.lendingContract.s_allowedTokens(i);
      approvedTokenAddresses.push(tokenAddress);
    }
    await user.setApprovedTokens(approvedTokenAddresses);
    const signer = user.provider.getSigner();
    for (let c in approvedTokenAddresses) {
      let contract = new ethers.Contract(
        approvedTokenAddresses[c],
        erc20ABI,
        signer
      );
      let name = await contract.name();
      let address = contract.address;
      let symbol = await contract.symbol();
      // total supply formatted
      let decimals = await contract.decimals();
      let totalSupply = await contract.totalSupply();
      totalSupply = totalSupply.toString();
      totalSupply = totalSupply.substring(0, totalSupply.length - decimals);
      // wallet amount formatted
      let walletBalance = await contract.balanceOf(user.walletAddress);
      walletBalance = walletBalance.toString();
      walletBalance = walletBalance.substring(
        0,
        walletBalance.length - decimals
      );
      // deposit total
      let depositTotal = await user.lendingContract.s_totalTokenDeposits(
        approvedTokenAddresses[c]
      );
      depositTotal = depositTotal.toString();
      depositTotal = depositTotal.substring(0, depositTotal.length - decimals);
      approvedTokens.push({
        name: name ? name : "",
        address: address ? address : "",
        symbol: symbol ? symbol : "",
        totalSupply: totalSupply ? totalSupply : "",
        decimals: decimals ? decimals : "",
        depositTotal: depositTotal ? depositTotal : "",
        walletBalance: walletBalance ? walletBalance : "",
      });
      tokenDrawers[symbol] = {
        depositDrawer: false,
        withdrawDrawer: false,
      };
    }
    await user.setApprovedTokens(approvedTokens);
    await user.setTokenDrawers(tokenDrawers);
    console.log(approvedTokens, tokenDrawers);
  }
  await user.setInitialLoad(true);
}
