import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

import HC_exporting from 'highcharts/modules/exporting'
import { Telephone } from 'src/app/model/telephone';
import { User } from 'src/app/model/user';
import { TelephoneService } from 'src/app/service/telephone.service';
@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent {
  oppolength!: any;
  Samsunglength: any;
  Applelength: any;
  ListAll!: any;

  constructor(private service : TelephoneService){

  }


  newData!:any[];

  fetchUsers(){

    this.service.getall().subscribe(data => {
    this.ListAll = data;
    this.ListAll.forEach((res: any) => {
        if(res['marque']=='Oppo'){
          res['naffectation'] = this.oppolength;
          console.log(this.oppolength)
        }
        else if(res['marque']=='Samsung'){
          res['naffectation'] = this.Samsunglength;
          console.log(this.Samsunglength)
        }
        else if(res['marque']=='Apple'){
          res['naffectation'] = this.Applelength;
          console.log(this.Applelength)
        }
    });
    this.newData = this.ListAll.map((item: any) => {
      return {
        marque: item.marque,
        naffectation: item.naffectation
      };
    });
    console.log(this.newData);
    this.chartOptions
})
}

  Highcharts = Highcharts;

  chartOptions = {};

  ngOnInit(){
    this.service.getall().subscribe(data =>{
      const oppo = data.filter((obj: any) => obj.marque === 'Oppo');
      this.oppolength = oppo.length;
      const Samsung = data.filter((obj: any) => obj.marque === 'Samsung');
      this.Samsunglength = Samsung.length;
      const Apple = data.filter((obj: any) => obj.marque === 'Apple');
      this.Applelength = Apple.length;
    });
    this.fetchUsers();
    this.chartOptions = {
      chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
      },
      title: {
          text: 'Telephone Stock',
          align: 'left'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      exporting: {
        enabled : true
      },
      credits: {
        enabled : false
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: this.newData
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
