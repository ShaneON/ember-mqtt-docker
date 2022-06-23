import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'oee-ember-exercise/config/environment';

const HOST = ENV.APP.apiUrl;
const API_TOKEN = ENV.APP.apiToken;

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = HOST;

  get headers() {
    let headers = {};
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
    return headers;
  }

  buildURL(...args) {
    return `${super.buildURL(...args)}`;
  }
}
