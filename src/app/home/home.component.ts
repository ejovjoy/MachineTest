import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fiveth: number;
  total: number;
  numbers:Array<number> = [];
  hasError: boolean = false;
  constructor(private _snackBar: MatSnackBar) { }
  ngOnInit() {
  }
  save(){
    if(this.isValid()){
      this.hasError = false;
      this.numbers = [this.first,this.second,this.third,this.fourth,this.fiveth];
      const sum = this.numbers.reduce((current, next) => current + next, 0);
      const total = this.total;
      this.saveToLocalStorage(total,sum);
      this.showMessage("Values has been saved");
    }else{
      this.hasError = true;
      this.showMessage("Please enter values in all fields");
    }
  }
  private isValid(){
    const hasValidValues = !isNaN(this.first)
    && !isNaN(this.second) 
    && !isNaN(this.third) 
    && !isNaN(this.fourth) 
    && !isNaN(this.fiveth) 
    && !isNaN(this.total);
    return hasValidValues;
   }
  private saveToLocalStorage(sum,value){
    localStorage.setItem("Sum",sum.toString());
    localStorage.setItem("Value",value);
  }

  showMessage(message){
    this._snackBar.open(message, "", {
      duration: 2000,
    });
  }
 
}
