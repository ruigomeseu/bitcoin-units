import * as units from './units';

const convert = (amount, from, to) => {
  const amountInFromUnit = amount * units.getUnit(from);

  return amountInFromUnit / units.getUnit(to);
};

class Bitcoin {
  constructor(value, unit) {
    this._value = value;
    this._unit = unit;
  }

  to(newUnit) {
    this._value = convert(this._value, this._unit, newUnit);
    this._unit = newUnit;

    return this;
  }

  value() {
    return this._value;
  }

  format() {
    const displayUnit = units.getDisplay(this._unit);

    let { unit } = displayUnit;

    if (displayUnit.pluralize && this._value !== 1) {
      unit += 's';
    }

    return `${this._value} ${unit}`;
  }

  toString() {
    return this._value.toString();
  }
}

const bitcoin = (value, unit) => new Bitcoin(value, unit);

bitcoin.convert = convert;
bitcoin.setDisplay = units.setDisplay;
bitcoin.setUnit = units.setUnit;
bitcoin.setFiat = (currency, rate, display = null) => {
  units.setUnit(currency, 1 / rate, display);
};

export default bitcoin;
