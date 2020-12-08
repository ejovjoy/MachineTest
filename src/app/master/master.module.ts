import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ChartComponent } from './chart/chart.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [ChartComponent, MainContainerComponent, AdminPanelComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    HttpClientModule,
    MaterialModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MasterModule { }
