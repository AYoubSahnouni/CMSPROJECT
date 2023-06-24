import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  Highcharts = Highcharts;
  chartoptions = {};

  @Input() label: string | undefined;
  @Input() total: string | undefined;
  @Input() pourcentage: string | undefined;

  ngOnInit(){
    this.chartoptions =  {
      chart: {
          type: 'area',
          backgroundColor:null,
          borderWidth: 0,
          margin: [2,2,2,2],
          height:60
      },
      title: {
          text: null
      },
      subtitle: {
          text: null
      },
      tooltip: {
          split: true,
          outside: true
      },
      legend: {
        enabled:false
      },
      credits: {
        enabled : false
      },
      exporting: {
        enabled:false
      },
      xAxis: {
        labels : {
          enabled: false
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickoptions: []
      },
      yAxis: {
        labels : {
          enabled: false
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickoptions: []
      },
      series: [
        {
          data : [70,65,55,32]
        }
      ]
  };
      HC_exporting(this.Highcharts);

      setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);
  }
}
