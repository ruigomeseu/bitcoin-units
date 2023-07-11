![](https://ruigomes.me/bitcoin-units.png?v=2)

# bitcoin-units

[![Build Status](https://img.shields.io/travis/ruigomeseu/bitcoin-units.svg)](https://travis-ci.org/ruigomeseu/bitcoin-units)
[![codecov](https://img.shields.io/codecov/c/github/ruigomeseu/bitcoin-units.svg)](https://codecov.io/gh/ruigomeseu/bitcoin-units)
[![npm version](https://badge.fury.io/js/bitcoin-units.svg)](https://badge.fury.io/js/bitcoin-units)
[![npm](https://img.shields.io/npm/dt/bitcoin-units.svg)](https://www.npmjs.com/package/bitcoin-units)
[![Twitter Follow](https://img.shields.io/twitter/follow/8bitgomes.svg?style=social)](https://twitter.com/8bitgomes)

Convert between any bitcoin unit - BTC, mBTC, μBTC, satoshi and even your own custom units.

```ts
new BitcoinUnit(10000, 'sats').to('BTC').getValue();
// 0.001;

new BitcoinUnit(21000, 'sats').to('BTC').format();
// '0.00021000 BTC';
```

👉 [Try the demo](https://bitcoinunits.app)

## Installation

Add `bitcoin-units` to your Javascript project dependencies using Yarn:

```bash
yarn add bitcoin-units
```

Or NPM:

```bash
npm install bitcoin-units --save
```

## Usage

### Importing

Import using ESM:

```js
import BitcoinUnit from 'bitcoin-units';
```

Or CJS:

```js
const BitcoinUnit = require('bitcoin-units');
```

### Converting bitcoin

Basic unit conversions are done using the `to(unit)` function:

```js
new BitcoinUnit(1, 'mBTC').to('BTC').getValue();
// 0.001;
```

#### Available units

There are 4 available units by default:
`btc`, `mbtc`, `bit` and `satoshi`.

You can also use any of the following aliases:

- `btc`: `bitcoin`or `bitcoins`

- `mbtc`: `millibtc`

- `bit`: `microbtc`

- `sats`: `sat`, `satoshi`, `satoshis`

#### Available getters

`getValue()` returns a `Number`:

```js
new BitcoinUnit(1, 'mBTC').to('BTC').value();
// 0.001;
```

`toString()` returns a `string`:

```js
new BitcoinUnit(100000, 'satoshi').to('BTC').toString();
// '0.001';
```

`format()` returns a string with the value and unit:

```js
new BitcoinUnit(100000, 'satoshi').to('BTC').format();
// '0.00100000 BTC';
```

### Customization

#### Custom Format

You can set your own custom formats using the `BitcoinUnit.setDisplay(unit, options)`:

```js
BitcoinUnit.setDisplay('sats', {
  format: '{amount} something',
});

new BitcoinUnit(1, 'BTC').to('satoshi').format();

// '100,000,000 something';
```

#### Custom Unit

If you want to create your own custom units, you can use the `bitcoin.setUnit(unit, value)`:

```js
BitcoinUnit.setUnit('custom', 1 / 1e2);

new BitcoinUnit(1, 'btc').to('custom').value();

// 100;
```

You can use this to create your own conversion to fiat currencies:

```js
// Let's suppose a rate of 1 BTC = $8000.00

BitcoinUnit.setUnit('usd', 1 / 8000);

new BitcoinUnit(1, 'satoshi').to('usd').value();

// 0.00008;
```

There's a shorthand to this function named `bitcoin.setFiat(unit, rate)`:

```js
BitcoinUnit.setFiat('usd', 8000);

new BitcoinUnit(1, 'satoshi').to('usd').value();

// 0.00008;
```

## Author

Rui Gomes  
https://ruigomes.me

## License

The MIT License (MIT). Please see [LICENSE file](https://github.com/ruigomeseu/bitcoin-units/blob/master/LICENSE.md) for more information.
