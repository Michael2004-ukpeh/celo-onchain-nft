const hre = require("hardhat");

async function main() {
  const ChainBattles = await hre.ethers.getContractFactory("ChainBattles");
  const 
  chainBattles = await ChainBattles.deploy();

  await chainBattles.deployed();

  console.log("chainBattles deployed to:", chainBattles.address);
  storeContractData(chainBattles);
}

function storeContractData(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/ChainBattles-address.json",
    JSON.stringify({ ChainBattles: contract.address }, undefined, 2)
  );

  const ChainBattlesArtifact = artifacts.readArtifactSync("ChainBattles");

  fs.writeFileSync(
    contractsDir + "/ChainBattles.json",
    JSON.stringify(ChainBattlesArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
