import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})

export class UserListingComponent implements OnInit { 
  displayedColumns: string[] = ['select','name', 'age', 'number'];
  dataSource:any =  [];
  filter:string;
  private url = 'assets/users.json';
  private _subscription:Subscription;
  loading: boolean;
  constructor(
    private http: HttpClient,
    private userService:UserService,
    private router: Router,
    private route: ActivatedRoute) {
 }
 filterOptions = [
  {value: 'all', viewValue: 'All'},
  {value: 'minor', viewValue: '<=18>'},
  {value: 'other', viewValue: '>= 18 & <= 56'},
  {value: 'senior', viewValue: '>=56'}
];
 selection = new SelectionModel<any>(true, []);
 ngOnInit() {
  this.loading = true;
  this.userService.setSelectedRows(new SelectionModel<any>(true, []));
  this.getData();
}
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getUserData(): Observable<any> {
   return this.http.get(this.url);
  }
  filterList(){
    this.selection.clear();
    this.getData();
    
  }
  getAge(dob){
    return moment().diff(dob, 'years');
  }
  
  getData(){
    this._subscription = this.getUserData().subscribe(response => {
      response.data.forEach((value)=>{
        value.age = this.getAge(value.dob);
        return value;
      })
      let filtredList = [];
      filtredList = this.getFiltredList(filtredList,response);
      this.dataSource = filtredList;
      this.loading = false;

    });
  }
  getFiltredList(filtredList,response){
    switch (this.filter) {
      case "all":
        filtredList = response.data;
        break;
      case "minor":
        filtredList = response.data.filter(item=>{
          return item.age <= 18;
        });
        break;
      case "other":
        filtredList = response.data.filter(item=>{
          return (item.age >= 18) && (item.age <= 56);
        });
        break;
      case "senior":
        filtredList = response.data.filter(item=>{
          return item.age >= 56;
        });
        break;
      default:
        filtredList = response.data;
    }
    return filtredList;
  }
  sendSelected(){
    this.userService.setSelectedRows(this.selection);
    this.router.navigate(['/userDirectory/selected']);
    
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
