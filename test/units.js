const { assert } = require('chai');
const bitcoin = require('../lib/bitcoin.cjs.js');

describe('Getting bitcoin units', () => {
  it('gets units by name', () => {
    const bit = 1 / 1E6;

    assert.equal(bitcoin.getUnit('bit'), bit);
  });

  it('gets units by their alias', () => {
    const satoshi = 1 / 1E8;

    assert.equal(bitcoin.getUnit('sats'), satoshi);
  });

  it('throws an error for unknown units', () => {
    assert.throws(() => bitcoin.getUnit('unknown'));
  });
});
