import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class LossReasonModel extends Model {
  @attr('string') title;
}
