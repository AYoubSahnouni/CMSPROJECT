import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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


 @Input() saleData!:any;



 

}
