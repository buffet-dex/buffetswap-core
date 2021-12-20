import { ethers } from 'hardhat'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  const Factory = await ethers.getContractFactory('BuffetFactory')
  const factory = await Factory.deploy(process.env.FEE_TO_SETTER)
  console.log('BuffetFactory deployed to:', factory.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
