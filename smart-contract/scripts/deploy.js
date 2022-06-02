const hre = require('hardhat')

async function main() {
  const zamozaCoinFactory = await hre.ethers.getContractFactory('ZamozaCoin')
  const zamozaCoin = await zamozaCoinFactory.deploy()

  await zamozaCoin.deployed()

  console.log('Zamoza Coin deployed to:', zamozaCoin.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
