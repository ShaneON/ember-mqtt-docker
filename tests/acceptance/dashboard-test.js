import { module, test } from 'qunit';
import { visit, currentURL, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Service from '@ember/service';
import { _resetStorages } from 'ember-local-storage/helpers/storage';
import Evented from '@ember/object/evented';
import sinon from 'sinon';
import mqttjs from 'mqtt/dist/mqtt';
import { later } from '@ember/runloop';

class MqttServiceStub extends Service.extend(Evented) {}

module('Acceptance | dashboard', function (hooks) {
  setupApplicationTest(hooks);

  let mqttServiceStub;
  let mqttMessage = '{"data":{}}';
  let mqttTopic = 'mqttTopic';

  hooks.beforeEach(function () {
    let mqttService = this.owner.lookup('service:mqtt');

    mqttServiceStub = new MqttServiceStub();
    sinon.replace(
      mqttjs,
      'connect',
      sinon.fake(() => {
        later(() => {
          mqttServiceStub.trigger('connect');
        }, 100);
        return {
          on: (sEvent) => {
            mqttServiceStub.on(sEvent, () => {
              if (sEvent === 'connect') {
                return mqttService.onConnect();
              } else if (sEvent === 'message') {
                return mqttService.onMessage(mqttTopic, mqttMessage);
              } else if (sEvent === 'error') {
                return mqttService.onError();
              }
            });
          },
          subscribe: (sTopic, sCallback) => {
            return sCallback(null, [{ topic: mqttTopic }]);
          },
          unsubscribe: (sTopic, sCallback) => {
            return sCallback(null, [{ topic: mqttTopic }]);
          },
        };
      })
    );
  });

  hooks.afterEach(function () {
    sinon.restore();
    window.localStorage.clear();
    _resetStorages();
  });

  test('visiting /', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('on visiting route connect to mqtt and store message in local storage ', async function (assert) {
    await visit('/');

    mqttServiceStub.trigger('message', mqttTopic, mqttMessage);

    assert.equal(window.localStorage['storage:loss-alerts'], '[{"data":{}}]');

    await waitFor('[data-test-dashboard]', { timeout: 2000 });

    assert.dom('[data-test-dashboard]').exists();
  });

  test('on visiting route error connecting to mqtt ', async function (assert) {
    await visit('/');

    mqttServiceStub.trigger('error');

    await waitFor('[data-test-error]', { timeout: 2000 });

    assert
      .dom('[data-test-error]')
      .hasText('There was an error connecting to MQTT');
  });
});
