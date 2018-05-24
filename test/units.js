import { assert } from 'chai';
import { getUnit } from '../src/units';

describe('Getting bitcoin units', () => {
  it('gets units by name', () => {
    const bit = 1 / 1E6;

    assert.equal(getUnit('bit'), bit);
  });

  it('gets units by their alias', () => {
    const satoshi = 1 / 1E8;

    assert.equal(getUnit('sats'), satoshi);
  });

  it('throws an error for unknown units', () => {
    assert.throws(() => getUnit('unknown'));
  });
});
