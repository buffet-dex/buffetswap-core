import { Contract, Wallet } from 'ethers'
import { waffle } from 'hardhat';
import { Web3Provider } from '@ethersproject/providers'
import { expandTo18Decimals } from './utilities'

import ERC20 from '../../artifacts/contracts/test/ERC20.sol/ERC20.json'
import BuffetFactory from '../../artifacts/contracts/BuffetFactory.sol/BuffetFactory.json'
import BuffetPair from '../../artifacts/contracts/BuffetPair.sol/BuffetPair.json'

const { deployContract } = waffle;

interface FactoryFixture {
  factory: Contract
}

const overrides = {
  gasLimit: 9999999
}

export async function factoryFixture([wallet]: Wallet[], _: Web3Provider): Promise<FactoryFixture> {
  const factory = await deployContract(wallet, BuffetFactory, [wallet.address], overrides)
  return { factory }
}

interface PairFixture extends FactoryFixture {
  token0: Contract
  token1: Contract
  pair: Contract
}

export async function pairFixture([wallet]: Wallet[], provider: Web3Provider): Promise<PairFixture> {
  const { factory } = await factoryFixture([wallet], provider)

  const tokenA = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)], overrides)
  const tokenB = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)], overrides)

  await factory.createPair(tokenA.address, tokenB.address, overrides)
  const pairAddress = await factory.getPair(tokenA.address, tokenB.address)
  const pair = new Contract(pairAddress, JSON.stringify(BuffetPair.abi), provider).connect(wallet)

  const token0Address = await pair.token0()
  const token0 = tokenA.address === token0Address ? tokenA : tokenB
  const token1 = tokenA.address === token0Address ? tokenB : tokenA

  return { factory, token0, token1, pair }
}
