// external
import _ from "lodash";

const networkMapping = [
  {
    chainId: "0x1",
    networkVersion: "1",
    name: "mainnet",
    chain: "eth",
    type: "production",
  },
  {
    chainId: "0x3",
    networkVersion: "3",
    name: "ropsten",
    chain: "eth",
    type: "test",
  },
  {
    chainId: "0x4",
    networkVersion: "4",
    name: "rinkeby",
    chain: "eth",
    type: "test",
  },
  {
    chainId: "0x5",
    networkVersion: "5",
    name: "goerli",
    chain: "eth",
    type: "test",
  },
  {
    chainId: "0x539",
    networkVersion: "1337",
    name: "ganache",
    chain: "eth",
    type: "local",
  },
];

export async function chainIdToNetworkName(chainId) {
  let networkIndex = _.findIndex(networkMapping, { chainId });
  if (networkIndex >= 0) {
    return networkMapping[networkIndex].name;
  } else {
    return "unknown";
  }
}
