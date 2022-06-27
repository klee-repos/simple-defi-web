// external
import { ethers } from "ethers";
// internal
import { lendingABI } from "../abis/LendingABI";
import { erc20ABI } from "../abis/ERC20ABI";

const { REACT_APP_LENDING_ADDRESS, REACT_APP_ERC20_ADDRESS } = process.env;

export const erc20ContractSetup = async (user, signer) => {
  await user.setERC20Contract(
    new ethers.Contract(REACT_APP_ERC20_ADDRESS, erc20ABI, signer)
  );
  let name = await user.erc20Contract.name();
  let totalSupply = await user.erc20Contract.totalSupply();
  let decimals = await user.erc20Contract.decimals();
  let symbol = await user.erc20Contract.symbol();
  totalSupply = totalSupply.toString();
  totalSupply = totalSupply.substring(0, totalSupply.length - Number(decimals));
  await user.setERC20Name(name);
  await user.setERC20TotalSupply(Number(totalSupply));
  await user.setERC20Decimals(Number(decimals));
  await user.setERC20Symbol(symbol);
};

export const lendingContractSetup = async (user, signer) => {
  await user.setLendingContract(
    new ethers.Contract(REACT_APP_LENDING_ADDRESS, lendingABI, signer)
  );
};
