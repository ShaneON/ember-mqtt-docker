import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import moment from 'moment';

const LOSS_ALERTS = [
  {
    alertFrom: '2022-05-31T16:08:00.000Z',
    alertTo: '2022-05-31T16:09:00.000Z',
    mode: 'performance',
    test: 'false',
    startMinutes: '3',
    endMinutes: '1',
    lossReason: {
      title: 'Horse on the conveyor'
    }
  },
  {
    alertFrom: '2022-05-31T15:08:00.000Z',
    alertTo: '2022-05-31T15:09:00.000Z',
    mode: 'availability',
    test: 'true',
    startMinutes: '3',
    endMinutes: '1',
    lossReason: {
      title: 'No more lids left'
    }
  },
];

module('Integration | Component | list', function (hooks) {
  setupRenderingTest(hooks);

  test('clicking the first row shows its details', async function (assert) {
  let alertFrom = moment(LOSS_ALERTS[0].alertFrom)
      .local()
      .format("DD/MM/YYYY HH:mm");
    let alertTo = moment(LOSS_ALERTS[0].alertTo)
      .local()
      .format("DD/MM/YYYY HH:mm");

    this.set('lossAlerts', LOSS_ALERTS);

    await render(hbs`<List @lossAlerts={{this.lossAlerts}}/>`);

    await click('[data-test-accordion="0"]');

    assert.dom('[data-test-alert-from="0"]').hasText(alertFrom);
    assert.dom('[data-test-alert-to="0"]').hasText(alertTo);
    assert.dom('[data-test-mode="0"]').hasText(LOSS_ALERTS[0].mode);
    assert.dom('[data-test-test="0"]').hasText(LOSS_ALERTS[0].test);
    assert.dom('[data-test-start-minutes="0"]').hasText(LOSS_ALERTS[0].startMinutes);
    assert.dom('[data-test-end-minutes="0"]').hasText(LOSS_ALERTS[0].endMinutes);
    assert.dom('[data-test-loss-reason="0"]').hasText(LOSS_ALERTS[0].lossReason.title);

    assert.dom('[data-test-accordion="1"]').hasClass('collapsed');

  });

  test('clicking the second row shows its details, and closes the first', async function (assert) {
    let alertFrom = moment(LOSS_ALERTS[1].alertFrom)
        .local()
        .format("DD/MM/YYYY HH:mm");
      let alertTo = moment(LOSS_ALERTS[1].alertTo)
        .local()
        .format("DD/MM/YYYY HH:mm");
  
      this.set('lossAlerts', LOSS_ALERTS);
  
      await render(hbs`<List @lossAlerts={{this.lossAlerts}}/>`);
  
      await click('[data-test-accordion="1"]');
  
      assert.dom('[data-test-alert-from="1"]').hasText(alertFrom);
      assert.dom('[data-test-alert-to="1"]').hasText(alertTo);
      assert.dom('[data-test-mode="1"]').hasText(LOSS_ALERTS[1].mode);
      assert.dom('[data-test-test="1"]').hasText(LOSS_ALERTS[1].test);
      assert.dom('[data-test-start-minutes="1"]').hasText(LOSS_ALERTS[1].startMinutes);
      assert.dom('[data-test-end-minutes="1"]').hasText(LOSS_ALERTS[1].endMinutes);
      assert.dom('[data-test-loss-reason="1"]').hasText(LOSS_ALERTS[1].lossReason.title);

      assert.dom('[data-test-accordion="0"]').hasClass('collapsed');
    });
});
