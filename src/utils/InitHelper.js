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
      let symbol = await contract.symbol();
      let totalSupply = await contract.totalSupply();
      totalSupply = totalSupply.toString();
      let decimals = await contract.decimals();
      totalSupply = totalSupply.substring(0, totalSupply.length - decimals);
      approvedTokens.push({
        name: name ? name : "",
        symbol: symbol ? symbol : "",
        totalSupply: totalSupply ? totalSupply : "",
        decimals: decimals ? decimals : "",
      });
    }
    await user.setApprovedTokens(approvedTokens);
    console.log(approvedTokens);
  }
  await user.setInitialLoad(true);
}
