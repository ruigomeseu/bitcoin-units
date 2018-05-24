![](https://ruigomes.me/bitcoin-units.png)

# bitcoin-units
[![Build Status](https://travis-ci.org/ruigomeseu/bitcoin-units.svg?branch=master)](https://travis-ci.org/ruigomeseu/bitcoin-units) [![Coverage Status](https://coveralls.io/repos/github/ruigomeseu/bitcoin-units/badge.svg?branch=master)](https://coveralls.io/github/ruigomeseu/bitcoin-units?branch=master)

Convert between any bitcoin unit - BTC, mBTC, μBTC, satoshi and even your own custom units!

```js
bitcoin(1, 'mBTC').to('BTC').value()
0.001

bitcoin(100000, 'satoshi').to('BTC').format()
'0.001 BTC'
```

## Installation
Add `bitcoin-units` to your Javascript project dependencies using Yarn:
```bash
yarn add bitcoin-units
```
Or NPM:
```bash
npm install bitcoin-units --save
```
