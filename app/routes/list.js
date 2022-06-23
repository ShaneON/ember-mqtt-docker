import Route from '@ember/routing/route';

export default class ListRoute extends Route {
  async model() {
    return this.store.findAll('loss-alert');
  }

  setupController(controller, model) {
    controller.lossAlerts = model;
    controller.pollLossAlerts();
  }
}
