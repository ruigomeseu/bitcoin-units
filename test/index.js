const { assert } = require('chai');
const bitcoin = require('../lib/bitcoin.cjs.js');

describe('Converting units', () => {
  it('converts units', () => {
    const amount = 160000000;

    assert.deepEqual(
      bitcoin(1.6, 'btc').to('satoshi').value(),
      amount
    );
  });

  it('converts units with the right decimal places', () => {
    const amount = 0.00225227;

    assert.deepEqual(
      bitcoin(225227, 'satoshi').to('btc').value(),
      amount
    );
  });

  it('converts units with the right decimal places', () => {
    const amount = '0.00000012 BTC';

    assert.deepEqual(
      bitcoin(12, 'satoshi').to('btc').format(),
      amount
    );
  });

  it('rounds down units with the right decimal places', () => {
    bitcoin.setDisplay('btc', { format: '{amount} BTC', fractionDigits: 6 });

    const amount = '0.002474 BTC';

    assert.deepEqual(
      bitcoin(247481, 'satoshi').to('btc').format(),
      amount
    );
  });

  it('handles incorrect units', () => {
    const amount = 0;

    assert.deepEqual(
      bitcoin(undefined, 'satoshi').to('btc').value(),
      amount
    );
  });

  it('returns strings', () => {
    assert.deepEqual(
      bitcoin(1, 'mBTC').to('BTC').toString(),
      '0.001'
    );
  });

  it('formats units', () => {
    assert.deepEqual(
      bitcoin(1, 'BTC').to('mBTC').format(),
      '1,000 mBTC'
    );
  });

  it('formats pluralizes units', () => {
    assert.deepEqual(
      bitcoin(1, 'BTC').to('satoshi').format(),
      '100,000,000 satoshis'
    );
  });

  it('shows custom displays', () => {
    bitcoin.setDisplay('satoshi', {
      format: '{amount} melo'
    });

    assert.deepEqual(
      bitcoin(1, 'BTC').to('satoshi').format(),
      '100,000,000 melo'
    );
  });

  it('sets new custom units', () => {
    bitcoin.setUnit('test', 1 / 1E2);

    assert.deepEqual(
      bitcoin(1, 'btc').to('test').value(),
      100
    );
  });

  it('sets new fiat units', () => {
    bitcoin.setFiat('usd', 8000);

    assert.deepEqual(
      bitcoin(1, 'satoshi').to('usd').value(),
      0.00008
    );
  });

  it('sets new fiat units with custom display', () => {
    bitcoin.setFiat('usd', 8000, { format: '${amount} USD' });

    assert.deepEqual(
      bitcoin(1, 'btc').to('usd').format(),
      '$8,000 USD'
    );
  });

  it('sets fraction digits with trailing', () => {
    bitcoin.setFiat('usd', 8000, { format: '${amount} USD', fractionDigits: 2, trailing: true });

    assert.deepEqual(
      bitcoin(1, 'btc').to('usd').format(),
      '$8,000.00 USD'
    );
  });

  it('sets fraction digits without trailing', () => {
    bitcoin.setFiat('usd', 1.2345678, { format: '${amount} USD', fractionDigits: 2 });

    assert.deepEqual(
      bitcoin(1, 'btc').to('usd').format(),
      '$1.23 USD'
    );
  });

  it('sets fraction digits without trailing', () => {
    bitcoin.setDisplay('btc', { format: '{amount} BTC', fractionDigits: 6 });

    assert.deepEqual(
      bitcoin(1398647, 'satoshis').to('btc').format(),
      '0.013986 BTC'
    );
  });

  it('sets fraction digits without trailing', () => {
    bitcoin.setDisplay('btc', { format: '{amount} BTC', fractionDigits: 6 });

    assert.deepEqual(
      bitcoin(1390000, 'satoshis').to('btc').format(),
      '0.0139 BTC'
    );
  });
});
