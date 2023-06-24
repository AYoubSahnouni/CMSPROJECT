import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

import HC_exporting from 'highcharts/modules/exporting'
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent {

  Highcharts = Highcharts;

  chartOptions = {};

  ngOnInit() {

      this.chartOptions = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Users Statistics',
            align: 'left'
        },
        subtitle: {
            text: 'CMS Company',
            align: 'left'
        },
        tooltip: {
            shared: true,
            headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
        },
        credits : {
            enabled  : false
        },
        exporting: {
            enabled : true
        },
        plotOptions: {
          series: {
              pointStart: 2015
          },
        },
        yAxis: {
          title: {
              useHTML: true,
              text: 'Statistics'
          }
        },
        series: [{
            name: 'New Users',
            data: [13234, 12729, 11533, 17798, 10398, 12811, 15483, 16196, 18000]
        }, {
            name: 'User Retention',
            data: [6685, 6535, 6389, 6384, 6251, 5725, 5631, 5047, 10000]

        }, {
            name: 'User Resignation',
            data: [4752, 4820, 4877, 4925, 5006, 4976, 4946, 4911, 8000]
        }, {
            name: 'Referral',
            data: [3164, 3541, 3898, 4115, 3388, 3569, 3887, 4593, 6000]

        }]
      }
      HC_exporting(this.Highcharts);

      setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);
  }

}
