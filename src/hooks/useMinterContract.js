import { useContract } from "./useContract";
import ChainBattles from "../contracts/ChainBattles.json";
import ChainBattlesContractAddress from "../contracts/ChainBattles-address.json";

export const useMinterContract = () =>
  useContract(ChainBattles.abi, ChainBattlesContractAddress.ChainBattles);
