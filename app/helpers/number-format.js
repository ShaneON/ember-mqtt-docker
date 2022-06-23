import { helper } from '@ember/component/helper';

export function numberFormat([number]) {
  return number.toFixed(2);
}

export default helper(numberFormat);
