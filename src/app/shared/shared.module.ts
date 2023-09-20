import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu'
import { MatListModule } from '@angular/material/list'
import { RouterModule } from '@angular/router';
import { CardsComponent } from './widgets/cards/cards.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SearchbarComponent } from './widgets/searchbar/searchbar.component';
import { AreaComponent } from './widgets/area/area.component';
import { CircleComponent } from './widgets/circle/circle.component';


import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchbarComponent,
    SidebarComponent,
    CardsComponent,
    AreaComponent,
    CircleComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    NgxChartsModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SearchbarComponent,
    SidebarComponent,
    CardsComponent,
    AreaComponent,
    CircleComponent,
  ]
})
export class SharedModule { }
