import getHours from 'oee-ember-exercise/utils/dates';
import { module, test } from 'qunit';

module('Unit | Utility | dates', function () {
  test('it works with two dates', function (assert) {
    let result = getHours('2022-06-03T10:00:00Z', '2022-06-03T11:00:00Z');

    assert.equal(result, 1);
  });

  test('it works with one date', function (assert) {
    let millis =
      new Date().getTime() - new Date('2022-06-03T20:00:00Z').getTime();
    let hours = (Math.round((millis / 1000 / 60 / 60) * 100) / 100).toFixed(2);
    let result = getHours('2022-06-03T20:00:00Z', null).toFixed(2);

    assert.equal(result, hours);
  });
});
