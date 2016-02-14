/* 
* @Author: Mike Reich
* @Date:   2016-02-05 07:45:34
* @Last Modified 2016-02-14
*/

'use strict';

import MetricModel from './models/metric'

/**
 * The Metrics module captures arbitrary data about events (a metric) for storage and querying later.
 */
export default class Metrics {
  constructor(app) {
    this.app = app
    app.get('metrics').use(this)

    app.get('storage').model(MetricModel)

    this.gather('capture')
    .respond('metric')
    .respond('getMetrics')
  }

  /**
   * Captures metric data about a specified @nxus/storage Model
   * @param  {string} model      The name of the model to capture. Must be a Storage/BaseModel class.
   * @param  {Array}  events     Optional. An array of model events to capture. Defaults to 'create', 'update', 'destroy'.
   */
  capture(model, events=['create', 'update', 'destroy']) {
    events.forEach((event) => {
      this.app.log.debug('Capturing', 'model.'+event+'.'+model)
      this.app.get('storage').on('model.'+event+'.'+model, (record) => {
        this.metric(model+this._tensify(event), record);
      })
    })
  }

  /**
   * Record a new metric value
   * @param  {string} name The metric name to use.
   * @param  {object} data An arbitrary object to record as as the data payload for the metric.
   * @return {Promise}      A promise that is fulfilled when the metric has been saved successfully.
   */
  metric(name, data) {
    return this.app.get('storage').getModel('metric').then((Metric) => {
      this.app.log.debug('Creating metric', {name, data})
      return Metric.create({name, data})
    })
  }

  /**
   * Returns metrics for the specified name, optionally using the query to filter returned values.
   * @param  {string} name  the name of the metrics to return
   * @param  {Object} query Optional.  The Waterline compatible query object to filter results by. 
   * @return {Promise}       A promise for the result set.
   */
  getMetrics(name, query={}) {
    query.name = name;
    return this.app.get('storage').getModel('metric').then((Metric) => {
      return Metric.find().where(query)
    })
  }

  _tensify(s) {
    if(s == 'create') return 'Created'
    if(s == 'update') return 'Updated'
    if(s == 'destroy') return 'Destroyed'
  }
} 