# Buffet Swap

[![Actions Status](https://github.com/buffet-dex/buffetswap-core/workflows/CI/badge.svg)](https://github.com/buffet-dex/buffetswap-core/actions)

Forked from [Uniswap V2][1].

# Local Development

The following assumes the use of `node@>=16`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`

## Deploy

### BSC Testnet

Deployed BuffetFactory: [0x2119E6A0c07c667D2D4777F082b718e8950AFDf1][2]

```sh
yarn hardhat run --network bsc_test scripts/deploy.ts
```

[1]: https://github.com/Uniswap/v2-core
[2]: https://testnet.bscscan.com/address/0x2119e6a0c07c667d2d4777f082b718e8950afdf1#code
