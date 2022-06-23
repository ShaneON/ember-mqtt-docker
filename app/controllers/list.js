import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import ENV from 'oee-ember-exercise/config/environment';

export default class ListController extends Controller {
  @tracked lossAlerts;

  async pollLossAlerts() {
    if (ENV.environment !== 'test') {
      later(
        this,
        function () {
          this.pollLossAlerts();
        },
        5000
      );
      this.lossAlerts = this.store.findAll('loss-alert');
    }
  }
}
