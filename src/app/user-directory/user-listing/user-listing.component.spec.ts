import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AgePipe } from '../pipes/age.pipe';

import { UserListingComponent } from './user-listing.component';

describe('UserListingComponent', () => {
  let component: UserListingComponent;
  let fixture: ComponentFixture<UserListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSortModule,
        MatTableModule,
        RouterTestingModule
      ],
      declarations: [ UserListingComponent,AgePipe ],
      providers: [HttpClient,HttpHandler],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
