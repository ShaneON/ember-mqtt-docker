import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import moment from 'moment';

module('Acceptance | list', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /list, the loss alerts and loss reasons are populated in the dom', async function (assert) {
    await visit('/list');

    assert.equal(currentURL(), '/list');

    let alertFrom = moment('2022-05-31T15:08:00.000Z')
      .local()
      .format('DD/MM/YYYY HH:mm');
    let alertTo = moment('2022-05-31T15:09:00.000Z')
      .local()
      .format('DD/MM/YYYY HH:mm');

    assert.dom('[data-test-alert-from]').hasText(alertFrom);
    assert.dom('[data-test-alert-to]').hasText(alertTo);
    assert.dom('[data-test-mode]').hasText('performance');
    assert.dom('[data-test-test]').hasText('false');
    assert.dom('[data-test-start-minutes]').hasText('3');
    assert.dom('[data-test-end-minutes]').hasText('1');
  });
});
