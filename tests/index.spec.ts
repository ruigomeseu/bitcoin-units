import BitcoinUnitType from '../src/index';

let BitcoinUnit: typeof BitcoinUnitType;

describe('Converting units', () => {
  beforeEach(() => {
    return import('../src/index').then((module) => {
      BitcoinUnit = module.default;
      jest.resetModules();
    });
  });

  it('converts units', () => {
    expect(new BitcoinUnit(1.6, 'btc').to('satoshi').getValue()).toBe(160000000);
  });

  it('converts units with the right decimal places', () => {
    expect(new BitcoinUnit(123456, 'satoshi').to('btc').getValue()).toBe(0.00123456);
  });

  it('converts units with the right decimal places', () => {
    expect(new BitcoinUnit(1, 'satoshi').to('btc').getValue()).toBe(0.00000001);
  });

  it('removes trailing zeros', () => {
    BitcoinUnit.setDisplay('btc', { format: '{amount} BTC', fractionDigits: 8, trailingZeros: false });
    expect(new BitcoinUnit(100, 'sats').to('btc').format()).toBe('0.000001 BTC');
  });

  it('keeps trailing zeros', () => {
    expect(new BitcoinUnit(100, 'sats').to('btc').format()).toBe('0.00000100 BTC');
  });

  it('handles large numbers', () => {
    expect(new BitcoinUnit(21000000, 'BTC').to('sats').format()).toBe('2,100,000,000,000,000 satoshis');
  });

  it('converts units with the right decimal places', () => {
    expect(new BitcoinUnit(120, 'satoshi').to('btc').format()).toBe('0.00000120 BTC');
  });

  it('rounds down units with the right decimal places', () => {
    BitcoinUnit.setDisplay('btc', { format: '{amount} BTC', fractionDigits: 6 });

    const amount = '0.002474 BTC';

    expect(new BitcoinUnit(247481, 'satoshi').to('btc').format()).toBe(amount);
  });

  it('returns strings', () => {
    expect(new BitcoinUnit(1, 'sats').to('BTC').toString()).toBe('0.00000001');
  });

  it('formats units', () => {
    expect(new BitcoinUnit(1, 'BTC').to('mBTC').format()).toBe('1,000.00000 mBTC');
  });

  it('shows custom displays', () => {
    BitcoinUnit.setDisplay('satoshi', {
      format: '{amount} melo',
    });

    expect(new BitcoinUnit(1, 'BTC').to('satoshi').format()).toBe('100,000,000 melo');
  });

  it('sets new custom units', () => {
    BitcoinUnit.addUnit('test', 1 / 1e2);

    expect(new BitcoinUnit(1, 'btc').to('test').getValue()).toBe(100);
  });

  it('sets new fiat units', () => {
    BitcoinUnit.setFiat('usd', 8000);

    expect(new BitcoinUnit(1, 'satoshi').to('usd').getValue()).toBe(0.00008);
  });

  it('sets new fiat units with custom display', () => {
    BitcoinUnit.setFiat('usd', 8000, { format: '${amount} USD' });

    expect(new BitcoinUnit(1, 'btc').to('usd').format()).toBe('$8,000 USD');
  });

  it('sets fraction digits with trailing', () => {
    BitcoinUnit.setFiat('usd', 8000, { format: '${amount} USD', fractionDigits: 2, trailingZeros: true });

    expect(new BitcoinUnit(1, 'btc').to('usd').format()).toBe('$8,000.00 USD');
  });

  it('rounds decimals with custom units', () => {
    BitcoinUnit.setFiat('eur', 27560, { format: '{amount} EUR', fractionDigits: 2, trailingZeros: true });
    expect(new BitcoinUnit(1, 'btc').to('eur').getValueAsString()).toBe('27560.00');
  });

  it('sets fraction digits without trailing', () => {
    BitcoinUnit.setFiat('usd', 1.2345678, { format: '${amount} USD', fractionDigits: 2 });

    expect(new BitcoinUnit(1, 'btc').to('usd').format()).toBe('$1.23 USD');
  });

  it('sets fraction digits without trailing', () => {
    BitcoinUnit.setDisplay('btc', { format: '{amount} BTC', fractionDigits: 6 });

    expect(new BitcoinUnit(12345678, 'satoshis').to('btc').format()).toBe('0.123456 BTC');
  });

  it('sets fraction digits without trailing', () => {
    BitcoinUnit.setDisplay('btc', { format: '{amount} BTC', fractionDigits: 8, trailingZeros: false });

    expect(new BitcoinUnit(1390000, 'satoshis').to('btc').format()).toBe('0.0139 BTC');
  });
});

describe('Error handling', () => {
  it('handles invalid amount', () => {
    expect(new BitcoinUnit('string' as unknown as number, 'satoshi').getValue()).toBe(0);
  });

  it('handles invalid unit', () => {
    expect(() => {
      new BitcoinUnit(1, 'invalid');
    }).toThrow();
  });
});
