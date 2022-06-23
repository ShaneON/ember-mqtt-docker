import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-data/model';

export default class LossAlertModel extends Model {
  @belongsTo('loss-reason') lossReason;

  @attr('date') alertFrom;
  @attr('date') alertTo;
  @attr('string') mode;
  @attr('number') startMinutes;
  @attr('number') endMinutes;
  @attr('boolean') test;
}
