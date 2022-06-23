import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';

module('Unit | Model | loss alert', function (hooks) {
  setupTest(hooks);

  test('should own a loss reason', function (assert) {
    const LossAlert = this.owner.lookup('service:store').modelFor('lossAlert');

    const relationship = LossAlert.relationshipsByName.get('lossReason');

    assert.equal(
      relationship.key,
      'lossReason',
      'has relationship with loss-reason'
    );
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });
});
