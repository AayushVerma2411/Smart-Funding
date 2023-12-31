
const { ethers } = require("hardhat");

async function main() 
{
  const deployedContract = await ethers.deployContract("CrowdFunding");

  await deployedContract.waitForDeployment();
  console.log("deploying contract....");

  console.log("Contract Address:", await deployedContract.getAddress()); 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});