// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 
   // We get the contract to deploy
   const [owner1 , owner2, owner3, recipient1] = await hre.ethers.getSigners();
   const threshold = 2;
  
   const MultiSignerWallet = await hre.ethers.getContractFactory("MultiSignerWallet");
   const wallet = await MultiSignerWallet.deploy([owner1.address, owner2.address, owner3.address], threshold);
   console.log("CRUD deployed to:", wallet.address);

   await wallet.deployed();

  await wallet.deposit({value: hre.ethers.utils.parseEther("5.0")});

  const transfer = await wallet.createTransfer(5, recipient1.address);

  await transfer.wait();

  const transfers = await wallet.getTransfers();
  // console.log(transfers);

  const approve = await wallet.connect(owner1).approveTransfer(0);
  await approve.wait();

  const approve2 = await wallet.connect(owner2).approveTransfer(0);
  await approve2.wait();

  const transfers2 = await wallet.getTransfers();

  console.log(transfers2);

  const recipient1Balance = await hre.ethers.provider.getBalance(recipient1.address);

  const balance = await hre.ethers.provider.getBalance(wallet.address);
  console.log("Balance: ", recipient1Balance);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});