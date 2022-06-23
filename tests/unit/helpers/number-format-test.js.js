import { numberFormat } from 'oee-ember-exercise/helpers/number-format';
import { module, test } from 'qunit';

module('Unit | Helper | number-format', function (hooks) {
  test('formats a number to two decimal places', function (assert) {
    assert.equal(format([2.333], {}), 2.33);
  });
});
