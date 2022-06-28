// external
import { ethers } from "ethers";
// internal
import { lendingABI } from "../abis/LendingABI";

const { REACT_APP_LENDING_ADDRESS } = process.env;

export const lendingContractSetup = async (user, signer) => {
  await user.setLendingContract(
    new ethers.Contract(REACT_APP_LENDING_ADDRESS, lendingABI, signer)
  );
  let totalAllowedTokens = await user.lendingContract.s_totalAllowedTokens();
  let ownerAddress = await user.lendingContract.owner();
  if (ownerAddress.toLowerCase() === user.walletAddress.toLowerCase()) {
    await user.setIsContractOwner(true);
  }
  totalAllowedTokens = Number(totalAllowedTokens.toString());
  await user.setTotalAllowedTokens(totalAllowedTokens);
};
