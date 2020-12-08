import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDirectoryRoutingModule } from './user-directory-routing.module';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { DirectoryComponent } from './directory/directory.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AgePipe } from './pipes/age.pipe';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [UserListingComponent, UserSelectionComponent, DirectoryComponent, AgePipe],
  imports: [
    CommonModule,
    UserDirectoryRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({})
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserDirectoryModule { }
