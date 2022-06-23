import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nav-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the oee.ai logo', async function (assert) {
    await render(hbs`<NavBar />`);

    assert
      .dom(this.element.querySelector('.navbar-brand img'))
      .hasClass('w-auto');
  });
});
