import { addZero } from "./AddZero";

/**
 * ```
 * Transform Values TO Other Formats by Type:
 *  Types:
 *    0. ''       : return the value
 *    1. date     : 'DD/MM/YY'
 *    2. time     : 'H:M:S'
 *    3. datetime : 'DD/MM/YY H:M:S'
 *    4. boolean  : value === true THEN `return cases[0]` ELSE `return cases[1]`
 * ```
 */
export const Transfer = (value, type = "", cases) => {
  const d = new Date(value);
  const [h, mu, s] = [d.getHours(), d.getMinutes(), d.getSeconds()];
  const [day, mo, y] = [d.getDate(), d.getMonth() + 1, d.getFullYear()];
  const DATE = `${addZero(day)}/${addZero(mo)}/${y}`;
  const TIME = `${addZero(h)}:${addZero(mu)}:${addZero(s)}`;

  switch (type.toLowerCase().trim()) {
    case "date":
      return DATE;
    case "time":
      return TIME;
    case "datetime":
      return `${DATE} ${TIME}`;
    case "boolean":
      return cases ? (value ? cases[0] : cases[1]) : value;
    default:
      return value;
  }
};