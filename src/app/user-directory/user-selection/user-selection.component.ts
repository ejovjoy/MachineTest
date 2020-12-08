import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  userServiceSubscription:Subscription;
  constructor(private userService:UserService) { }
  selected:Array<Object>=[];
  isEmpty:boolean = false;
  ngOnInit() {
    
    this.userServiceSubscription = this.userService
      .getSelectedRows()
      .subscribe(response => {
        this.selected = response;
      });
  }
  ngOnDestroy() {
    this.userServiceSubscription.unsubscribe();
  }

}
