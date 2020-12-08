import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthorizationService } from './authorization/authorization.service';
import { ChartComponent } from './chart/chart.component';
import { MainContainerComponent } from './main-container/main-container.component';

const routes: Routes = [
  {path: '',component: MainContainerComponent,children:[
    { path: '',pathMatch: 'full',redirectTo: 'chart'},
    {path: 'chart',component: ChartComponent},
    {path: 'admin', pathMatch: 'full',canActivate:[AuthorizationService], component: AdminPanelComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
