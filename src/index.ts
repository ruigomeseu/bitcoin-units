import Big from 'big.js';
import { Unit, getUnit, addUnit, DisplayFormat, setDisplay } from './units';

export default class BitcoinUnit {
  protected value: Big;
  protected unit: Unit;

  constructor(value: number, unitName: string) {
    try {
      this.value = Big(value);
    } catch (error) {
      this.value = Big(0);
    }

    this.unit = getUnit(unitName);
  }

  to(toUnitName: string): BitcoinUnit {
    const toUnit = getUnit(toUnitName);

    this.value = this.value.times(this.unit.value).div(toUnit.value);

    this.unit = getUnit(toUnitName);

    return this;
  }

  getValue(): number {
    return this.value.toNumber();
  }

  getValueAsString(): string {
    return this.value.toFixed(this.unit.display.fractionDigits);
  }

  toString(): string {
    return this.getValueAsString();
  }

  format(): string {
    const { format, fractionDigits, trailingZeros } = this.unit.display;

    let valueString: string;

    const addThousandSeparator = (s: string) => s.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

    const removeTrailingZeros = (s: string) => s.replace(/^(\d+\.\d*?[1-9])0+$/g, '$1');

    valueString = this.value.toFixed(fractionDigits, Big.roundDown);

    if (!trailingZeros) {
      valueString = removeTrailingZeros(valueString);
    }

    valueString = addThousandSeparator(valueString);

    return format.replace('{amount}', valueString);
  }

  static setDisplay(unitName: string, options: Partial<DisplayFormat>) {
    setDisplay(unitName, options);

    return this;
  }

  static addUnit(name: string, value: number, display?: Partial<DisplayFormat>, aliases?: string[]) {
    return addUnit(name, value, display, aliases);
  }

  static getUnit(name: string) {
    return getUnit(name);
  }

  static setFiat(currency: string, rate: number, display?: Partial<DisplayFormat>) {
    return BitcoinUnit.addUnit(currency, 1 / rate, display);
  }
}
