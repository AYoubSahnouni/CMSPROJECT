import { Component, Input,OnInit,OnChanges,SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

import HC_exporting from 'highcharts/modules/exporting'
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit,OnChanges{

  @Input() data:any ;
  Highcharts = Highcharts;


  chartOptions = {};
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue !== undefined) {
      this.chartOptions = {
        chart: {
          type: 'area'
      },
      title: {
          text: 'Statistiques des Employés',
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
            text: 'Statistiques'
        }
      },

        series: changes['data'].currentValue

      };

      // Rest of your code
      //console.log("chart config : "+this.data);

    }
  }



  ngOnInit() {


      this.chartOptions = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Statistiques des Employés',
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
              text: 'Statistiques'
          }
        },
        series: [
          {
            name: 'Nouveaux Employés',
            data: this.data
          },
          {
            name: 'Modification Telephone',
            data: this.data
          },
          {
            name: 'Démission Employés',
            data: this.data
          }
        ]
      }
      HC_exporting(this.Highcharts);

      setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);

      console.log("this is the data "+this.data);
    }


}
