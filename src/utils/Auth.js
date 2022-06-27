import { ethers } from "ethers";
import { chainIdToNetworkName } from "./NetworkMapping";
import { erc20ContractSetup, lendingContractSetup } from "./ContractSetup";

export async function connectWeb3Wallet(user, cookies) {
  try {
    console.log("starting connect...");
    if (typeof window.ethereum != "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      await user.setProvider(provider);
      const signer = user.provider.getSigner();
      await erc20ContractSetup(user, signer);
      await lendingContractSetup(user, signer);
      await user.setWalletAddress(provider.provider.selectedAddress);
      await user.setChainId(provider.provider.chainId);
      await user.setNetworkVersion(provider.provider.networkVersion);
      await user.setNetworkName(await chainIdToNetworkName(user.chainId));
      await user.setInitialLoad(true);
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

    console.log(user);
    cookies.set("connected", `false`);
    // debug
    console.log(`connected: ${user.walletAddress}`);
  } catch (e) {
    console.log(e);
  }
}
