import Component from '@ember/component';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { filter, map } from '@ember/object/computed';
import { computed } from '@ember/object';
import { storageFor } from 'ember-local-storage';
import { later } from '@ember/runloop';
import ENV from 'oee-ember-exercise/config/environment';
import getHours from 'oee-ember-exercise/utils/dates';

export default Component.extend({
  lossAlerts: [],
  performanceView: null,
  availabilityView: null,

  storage: storageFor('lossAlerts'),

  chartData: map('lossAlerts.[]', function (lossAlert, index) {
    let alertFrom = lossAlert.data.attributes['alert-from'];
    let alertTo = lossAlert.data.attributes['alert-to'];
    return {
      date: new Date(alertFrom).getTime(),
      hours: getHours(alertFrom, alertTo),
      mode: lossAlert.data.attributes.mode,
      hasEnd: !!lossAlert.data.attributes['alert-to'],
    };
  }),

  performanceData: filter('chartData', function (lossAlert) {
    return lossAlert.mode === 'performance';
  }),
  availabilityData: filter('chartData', function (lossAlert) {
    return lossAlert.mode === 'availability';
  }),
  performanceUnresolvedLosses: filter('performanceData', function (lossAlert) {
    return !lossAlert.hasEnd;
  }),
  availabilityUnresolvedLosses: filter(
    'availabilityData',
    function (lossAlert) {
      return !lossAlert.hasEnd;
    }
  ),

  performanceTotalLossHours: computed('performanceData', function () {
    return this.performanceData.reduce(
      (previous, current) => previous + current.hours,
      0
    );
  }),
  availabilityTotalLossHours: computed('availabilityData', function () {
    return this.availabilityData.reduce(
      (previous, current) => previous + current.hours,
      0
    );
  }),
  performanceAvgLossHours: computed(
    'performanceData.length',
    'performanceTotalLossHours',
    function () {
      if (!this.performanceData.length) return 0;
      return this.performanceTotalLossHours / this.performanceData.length;
    }
  ),
  availabilityAvgLossHours: computed(
    'availabilityData.length',
    'availabilityTotalLossHours',
    function () {
      if (!this.availabilityData.length) return 0;
      return this.availabilityTotalLossHours / this.availabilityData.length;
    }
  ),

  didInsertElement() {
    this._super(...arguments);
    let root = am5.Root.new('chartdiv');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'zoomX',
      })
    );
    cursor.lineY.set('visible', false);

    let date = new Date();
    date.setHours(0, 0, 0, 0);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: 'minute',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          maxPrecision: 0,
          baseInterval: {
            timeUnit: 'hour',
            count: 1,
          },
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Availability',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'hours',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    this.availabilityView = series;
    this.availabilityView.data.setAll(this.availabilityData);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Performance',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'hours',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    this.performanceView = series;
    this.performanceView.data.setAll(this.performanceData);

    this.pollLocalStorage();

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.rightAxesContainer.children.push(
      am5.Legend.new(root, {
        width: 200,
        paddingLeft: 15,
        height: am5.percent(100),
      })
    );

    // When legend item container is hovered, dim all the series except the hovered one
    legend.itemContainers.template.events.on('pointerover', function (e) {
      let itemContainer = e.target;

      // As series list is data of a legend, dataContext is series
      let series = itemContainer.dataItem.dataContext;

      chart.series.each(function (chartSeries) {
        if (chartSeries != series) {
          chartSeries.columns.template.setAll({
            strokeOpacity: 0.15,
            stroke: am5.color(0x000000),
          });
        } else {
          chartSeries.columns.template.setAll({
            strokeWidth: 3,
          });
        }
      });
    });

    // When legend item container is unhovered, make all series as they are
    legend.itemContainers.template.events.on('pointerout', function (e) {
      let itemContainer = e.target;
      let series = itemContainer.dataItem.dataContext;

      chart.series.each(function (chartSeries) {
        chartSeries.columns.template.setAll({
          strokeOpacity: 1,
          strokeWidth: 1,
          stroke: chartSeries.get('fill'),
        });
      });
    });

    legend.itemContainers.template.set('width', am5.p100);
    legend.valueLabels.template.setAll({
      width: am5.p100,
      textAlign: 'right',
    });

    // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
    legend.data.setAll(chart.series.values);

    series.columns.template.adapters.add('fill', function (fill, target) {
      if (target.dataItem && !target.dataItem.endTime) {
        return am5.color('#a55');
      } else {
        return fill;
      }
    });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  },

  willDestroyElement() {
    if (this.root) {
      this.root.dispose();
    }
    this._super(...arguments);
  },

  async pollLocalStorage() {
    if (ENV.environment !== 'test') {
      later(
        this,
        function () {
          this.pollLocalStorage();
        },
        500
      );
    }
    this.set('lossAlerts', []);
    this.storage.content.forEach((item) => {
      this.lossAlerts.pushObject(item);
    });

    this.performanceView.data.setAll(this.performanceData);
    this.availabilityView.data.setAll(this.availabilityData);
  },
});
