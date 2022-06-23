import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'oee-ember-exercise/config/environment';
import { storageFor } from 'ember-local-storage';

const URL = ENV.APP.mqttUrl;
const USERNAME = ENV.APP.apiKey;
const PASSWORD = ENV.APP.apiToken;
const TOPIC = ENV.APP.mqttTopic;

const ERROR_MESSAGE = 'There was an error connecting to MQTT';

export default class DashboardRoute extends Route {
  @storageFor('loss-alerts') lossAlerts;
  @service mqtt;

  async setupController(controller, model) {
    super.setupController(...arguments);

    try {
      await this.mqtt.connect(URL, USERNAME, PASSWORD);
      await this.mqtt.subscribe(TOPIC);
    } catch (e) {
      controller.error = ERROR_MESSAGE;
    }

    this.mqtt.on('mqtt-message', (topic, message) => {
      this.lossAlerts.addObject(JSON.parse(message));
    });

    this.mqtt.on('mqtt-error', () => {
      controller.error = ERROR_MESSAGE;
    });
  }

  async willDestroy() {
    super.willDestroy(...arguments);

    await this.mqtt.unsubscribe(TOPIC);
  }
}
