const units = {
  btc: 1,
  mbtc: 1 / 1E3,
  bit: 1 / 1E6,
  satoshi: 1 / 1E8,
};

const aliases = {
  btc: ['bitcoin', 'bitcoins'],
  mbtc: ['millibtc'],
  bit: ['μbtc', 'microbtc'],
  satoshi: ['sat', 'sats', 'satoshis']
};

const display = {
  btc: {
    format: '{amount} BTC',
  },
  mbtc: {
    format: '{amount} mBTC'
  },
  bit: {
    format: '{amount} μBTC'
  },
  satoshi: {
    format: '{amount} satoshi',
    pluralize: true
  },
};

const getUnitNameByAlias = (unitName) => {
  const name = unitName.toLowerCase();

  const alias = Object.keys(aliases).find(key => aliases[key].includes(name));

  if (alias === undefined) {
    throw new Error(`Unit '${unitName}' is not supported`);
  }

  return alias;
};

const getUnitName = (unitName) => {
  const name = unitName.toLowerCase();

  const unit = units[name];

  if (unit !== undefined) return name;

  return getUnitNameByAlias(unitName);
};

const getUnit = unit => units[getUnitName(unit)];

const setDisplay = (unit, options) => {
  display[unit] = options;
};

const getDisplay = unit => display[getUnitName(unit)];

const setUnit = (unit, value, displayOptions = null) => {
  units[unit] = value;
  display[unit] = displayOptions !== null ? displayOptions : { format: `{amount} ${unit}` };
};

export { getUnit, setUnit, getDisplay, setDisplay };
