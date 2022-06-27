// external
import { ethers } from "ethers";
// internal
import { lendingAbi, lendingContractAddress } from "../utils/LendingContract";
import { erc20abi, erc20ContractAddress } from "../utils/ERC20Contract";

export const erc20ContractSetup = async (user, signer) => {
  await user.setERC20Contract(
    new ethers.Contract(erc20ContractAddress, erc20abi, signer)
  );
  let name = await user.erc20Contract.name();
  let totalSupply = await user.erc20Contract.totalSupply();
  let decimals = await user.erc20Contract.decimals();
  totalSupply = totalSupply.toString();
  totalSupply = totalSupply.substring(0, totalSupply.length - Number(decimals));
  await user.setERC20Name(name);
  await user.setERC20TotalSupply(Number(totalSupply));
  console.log(user);
};

export const lendingContractSetup = async (user, signer) => {
  await user.setLendingContract(
    new ethers.Contract(lendingContractAddress, lendingAbi, signer)
  );
};
