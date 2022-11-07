// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CRUD = await hre.ethers.getContractFactory("CRUD");
  console.log("Deploying CRUD...");
  const crud = await CRUD.deploy();
  console.log("CRUD deployed to:", crud.address);
  await crud.deployed();

  
  const response = await crud.create(
    "Krishna",
    "krishna@gmail.com",
    23,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );



  const totalNumberOfEmployee1 = await crud.totalEmployees();
  const employee = await crud.employees(0);
  console.log(totalNumberOfEmployee1.toNumber());

  await crud.updateEmployee("Communiti", "krishna@gmail.com");

  const employee2 = await crud.employees(0);
  // console.log(employee2);
 const deleteres =  await crud.deleteEmpolyees('krishna@gmail.com');
  const totalNumberOfEmployee2 = await crud.totalEmployees();
  console.log(totalNumberOfEmployee2.toNumber(),'deleteres',);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
