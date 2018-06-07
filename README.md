![](https://ruigomes.me/bitcoin-units.png?v=2)

# bitcoin-units
[![Build Status](https://img.shields.io/travis/ruigomeseu/bitcoin-units.svg)](https://travis-ci.org/ruigomeseu/bitcoin-units) [![codecov](https://img.shields.io/codecov/c/github/ruigomeseu/bitcoin-units.svg)](https://codecov.io/gh/ruigomeseu/bitcoin-units) [![npm version](https://badge.fury.io/js/bitcoin-units.svg)](https://badge.fury.io/js/bitcoin-units)

Convert between any bitcoin unit - BTC, mBTC, μBTC, satoshi and even your own custom units! Available for ES6 and Node.js.

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

## Usage

### Importing
Import using ES6:

```js
import bitcoin from 'bitcoin-units';
```

Or AMD:

```js
var bitcoin = require('bitcoin-units');
```

### Converting bitcoin

Basic unit conversions are done using the `to(unit)` function:
```js
bitcoin(1, 'mBTC').to('BTC').value()
0.001
```

#### Available units

There are 4 available units by default:
`btc`, `mbtc`, `bit` and `satoshi`.

You can also use any of the following aliases:

- `btc`: `bitcoin` or `bitcoins`

- `mbtc`: `millibtc`

- `bit`: `μbtc` or `microbtc`

- `satoshi`: `sat`, `sats`, `satoshi`, `satoshis`



#### Available getters

`value()` returns a `Number`:
```js
bitcoin(1, 'mBTC').to('BTC').value()
0.001
```

`toString()` returns a `string`:
```js
bitcoin(100000, 'satoshi').to('BTC').toString()
'0.001'
```

`format()` returns a string with the value and unit:
```js
bitcoin(100000, 'satoshi').to('BTC').format()
'0.001 BTC'
```

### Customization

#### Custom Format
You can set your own custom formats using the `bitcoin.setDisplay(unit, options)`:

```js
bitcoin.setDisplay('satoshi', {
  format: '{amount} sats'
});

bitcoin(1, 'BTC').to('satoshi').format();

'100,000,000 sats'
```

#### Custom Unit
If you want to create your own custom units, you can use the `bitcoin.setUnit(unit, value)`:
```js
bitcoin.setUnit('custom', 1 / 1E2);

bitcoin(1, 'btc').to('custom').value();

100
```

You can use this to create your own conversion to fiat currencies:

```js
// Let's suppose a rate of 1 BTC = $8000.00

bitcoin.setUnit('usd', 1 / 8000);

bitcoin(1, 'satoshi').to('usd').value();

0.00008
```

There's a shorthand to this function named `bitcoin.setFiat(unit, rate)`:
```js
bitcoin.setFiat('usd', 8000);

bitcoin(1, 'satoshi').to('usd').value();

0.00008
```

## Author

Rui Gomes  
https://ruigomes.me  

## License

The MIT License (MIT). Please see [LICENSE file](https://github.com/ruigomeseu/bitcoin-units/blob/master/LICENSE.md) for more information.
