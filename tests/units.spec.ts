import { getUnit } from '../src/units';

describe('Getting bitcoin units', () => {
  it('gets units by name', () => {
    const bit = 1 / 1e6;

    expect(getUnit('bit').value.toNumber()).toBe(bit);
  });

  it('gets units by their alias', () => {
    const satoshi = 1 / 1e8;

    expect(getUnit('sats').value.toNumber()).toBe(satoshi);
  });

  it('throws an error for unknown units', () => {
    expect(() => getUnit('unknown')).toThrow();
  });
});
