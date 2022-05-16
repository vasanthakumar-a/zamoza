const hre = require('hardhat')

async function main() {
  const ZamozaCoinFactory = await hre.ethers.getContractFactory('ZamozaCoin')
  const ZamozaCoin = await ZamozaCoinFactory.deploy()

  await ZamozaCoin.deployed()

  console.log('Zamoza Coin deployed to:', ZamozaCoin.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });