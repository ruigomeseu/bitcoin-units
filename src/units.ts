import Big from 'big.js';

type DisplayFormat = {
  format: string;
  fractionDigits: number;
  trailingZeros: boolean;
};

const displayFormatDefaults = (display?: Partial<DisplayFormat>): DisplayFormat => {
  return {
    format: display?.format ?? '',
    fractionDigits: display?.fractionDigits ?? 0,
    trailingZeros: display?.trailingZeros ?? false,
  };
};

class Unit {
  public name: string;
  public aliases: string[];
  public value: Big;
  public display: DisplayFormat;

  constructor(name: string, value: number | Big, display?: Partial<DisplayFormat>, aliases?: string[]) {
    this.name = name;
    this.display = displayFormatDefaults(display);
    this.aliases = aliases ? aliases : [];

    if (value instanceof Big) {
      this.value = value;
    } else {
      this.value = Big(value);
    }
  }

  setDisplay(display: DisplayFormat) {
    this.display = display;
  }
}

const units: Unit[] = [
  new Unit(
    'btc',
    1,
    {
      format: '{amount} BTC',
      fractionDigits: 8,
      trailingZeros: true,
    },
    ['bitcoin'],
  ),

  new Unit(
    'mbtc',
    1 / 1e3,
    {
      format: '{amount} mBTC',
      fractionDigits: 5,
      trailingZeros: true,
    },
    ['millibtc'],
  ),
  new Unit(
    'bit',
    1 / 1e6,
    {
      format: '{amount} μBTC',
      fractionDigits: 2,
      trailingZeros: true,
    },
    ['microbtc'],
  ),

  new Unit(
    'sats',
    1 / 1e8,
    {
      format: '{amount} satoshis',
      fractionDigits: 0,
      trailingZeros: false,
    },
    ['sat', 'satoshis', 'satoshi'],
  ),
];

let unitsMap: Map<string, Unit>;

const setUnitsMap = () => {
  unitsMap = new Map();

  units.forEach((unit) => {
    unitsMap.set(unit.name, unit);

    unit.aliases.forEach((alias) => {
      unitsMap.set(alias, unit);
    });
  });
};

setUnitsMap();

const getUnit = (name: string) => {
  const unit = unitsMap.get(name.toLowerCase());

  if (!unit) {
    throw new Error(`Invalid unit: ${name}`);
  }

  return unit;
};

const addUnit = (name: string, value: number, display?: Partial<DisplayFormat>, aliases?: string[]) => {
  const unit = new Unit(name, value, display, aliases);

  units.push(unit);

  setUnitsMap();
};

const setDisplay = (unitName: string, display: Partial<DisplayFormat>) => {
  const unit = getUnit(unitName);

  unit.display = displayFormatDefaults(display);
};

export { Unit, DisplayFormat, setDisplay, getUnit, addUnit };
