const { hexStripZeros } = require("ethers/lib/utils");
const hre = require("hardhat");

const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log('Contract deployed by :', owner.address);
    console.log("Here's the owner :", owner)


    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    
    let waveTx = await waveContract.wave();
    await waveTx.wait();
    
    waveCount = await waveContract.getTotalWaves();
    

    waveTx = await waveContract.connect(randomPerson).wave();
    await waveTx.wait();

    waveCount = await waveContract.getTotalWaves();
    
    console.log("The signers are : ", await hre.ethers.getSigners())

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();