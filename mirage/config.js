export default function () {
  this.get('https://api.preview.oee.ai/loss-alerts', () => {
    return [
      {
        id: '1',
        type: 'loss-alerts',
        links: {
          self: 'https://api.preview.oee.ai/loss-alerts/1',
        },
        attributes: {
          'alert-from': '2022-05-31T15:08:00.000Z',
          'alert-to': '2022-05-31T15:09:00.000Z',
          mode: 'performance',
          test: false,
          'start-minutes': 3,
          'end-minutes': 1,
        },
        relationships: {
          'loss-reason': {
            links: {
              related: 'https://api.preview.oee.ai/loss-alerts/1/loss-reason',
            },
            data: {
              type: 'loss-reasons',
              id: '1',
            },
          },
        },
      },
    ];
  });
  this.get('https://api.preview.oee.ai/loss-alerts/1/loss-reason', () => {
    return {
      id: '2b9b9745-53cd-45f5-984f-b66daceefcd3',
      type: 'loss-reasons',
      links: {
        self: 'https://api.preview.oee.ai/loss-reasons/2b9b9745-53cd-45f5-984f-b66daceefcd3',
      },
      attributes: {
        title: 'Product change',
        'title-de': 'Produktwechsel',
        'title-en': 'Product change',
        'title-it': null,
        'title-ro': null,
        'title-cz': null,
        path: '2b9b9745',
        'valid-from': '2022-05-01',
        'valid-to': null,
        classification: 'processual',
        tags: [],
        color: 'purple',
        icon: 'random',
        mode: 'availability',
        'target-minutes': 0,
        'reduces-oee': true,
        'changes-product': false,
        'input-rejects': false,
      },
      relationships: {
        location: {
          links: {
            related:
              'https://api.preview.oee.ai/loss-reasons/2b9b9745-53cd-45f5-984f-b66daceefcd3/location',
          },
          data: {
            type: 'locations',
            id: '38fdcacc-516d-4bdf-a333-905789b3b0af',
          },
        },
        'parent-loss-reason': {
          links: {
            related:
              'https://api.preview.oee.ai/loss-reasons/2b9b9745-53cd-45f5-984f-b66daceefcd3/parent-loss-reason',
          },
          data: null,
        },
        'child-loss-reasons': {
          links: {
            related:
              'https://api.preview.oee.ai/loss-reasons/2b9b9745-53cd-45f5-984f-b66daceefcd3/child-loss-reasons',
          },
        },
      },
    };
  });
  // These comments are here to help you get started. Feel free to delete them.
  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */
}
