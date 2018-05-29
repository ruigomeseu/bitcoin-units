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

    const { format } = displayUnit;
    let { minimumFractionDigits, maximumFractionDigits } = displayUnit;

    minimumFractionDigits = minimumFractionDigits || 0;
    maximumFractionDigits = maximumFractionDigits || Math.max(minimumFractionDigits, 3);

    let formatted = format.replace('{amount}', this._value.toLocaleString('en', { minimumFractionDigits, maximumFractionDigits }));

    if (displayUnit.pluralize && this._value !== 1) {
      formatted += 's';
    }

    return formatted;
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
