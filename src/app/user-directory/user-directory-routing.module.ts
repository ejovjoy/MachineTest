import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectoryComponent } from './directory/directory.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';

const routes: Routes = [
  {path: '',component: DirectoryComponent,children:[
  { path: '',pathMatch: 'full',redirectTo: 'list'},
  {path: 'list',  pathMatch: 'full',component: UserListingComponent},
  {path: 'selected', pathMatch: 'prefix', component: UserSelectionComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDirectoryRoutingModule { }
