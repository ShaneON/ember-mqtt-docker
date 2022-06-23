import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import StorageArray from 'ember-local-storage/local/array';

const LOSS_ALERTS = [
  {
    data: {
      type: 'loss-alerts',
      id: '9522d7f3-28d2-4d6a-ad10-70cb34b44041',
      attributes: {
        'alert-from': '2022-06-03T10:00:00Z',
        'alert-to': '2022-06-03T11:00:00Z',
        mode: 'performance',
        test: false,
        'start-minutes': 3,
        'end-minutes': 1,
      },
      relationships: {
        location: {
          data: {
            type: 'locations',
            id: '38fdcacc-516d-4bdf-a333-905789b3b0af',
          },
        },
        'loss-reason': {
          data: {
            type: 'loss-reasons',
            id: 'a7d3e81c-e902-4fd3-9e49-52332b2ef134',
          },
        },
      },
    },
  },
  {
    data: {
      type: 'loss-alerts',
      id: '9522d7f3-28d2-4d6a-ad10-70cb34b44041',
      attributes: {
        'alert-from': '2022-06-03T20:00:00Z',
        'alert-to': null,
        mode: 'availability',
        test: false,
        'start-minutes': 3,
        'end-minutes': 1,
      },
      relationships: {
        location: {
          data: {
            type: 'locations',
            id: '38fdcacc-516d-4bdf-a333-905789b3b0af',
          },
        },
        'loss-reason': {
          data: {
            type: 'loss-reasons',
            id: 'a7d3e81c-e902-4fd3-9e49-52332b2ef134',
          },
        },
      },
    },
  },
];

module('Integration | Component | dashboard', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    let mockStorage = StorageArray.extend();

    mockStorage.reopenClass({
      initialState() {
        return LOSS_ALERTS;
      },
    });

    this.owner.register('storage:loss-alerts', mockStorage);
  });

  test('it renders the dashboard stats', async function (assert) {
    await render(hbs`<Dashboard />`);

    assert.dom('[data-test-performance-avg]').hasText('1.00');
    assert.dom('[data-test-performance-total]').hasText('1.00');
    assert.dom('[data-test-performance-unresolved]').hasText('0');

    let millis =
      new Date().getTime() - new Date('2022-06-03T20:00:00Z').getTime();
    let hours = (Math.round((millis / 1000 / 60 / 60) * 100) / 100).toFixed(2);

    assert.dom('[data-test-availability-avg]').hasText(hours.toString());
    assert.dom('[data-test-availability-total]').hasText(hours.toString());
    assert.dom('[data-test-availability-unresolved]').hasText('1');
  });
});
