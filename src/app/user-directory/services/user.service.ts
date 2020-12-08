import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public _selectedRows = <BehaviorSubject<any>>new BehaviorSubject('');

  isShowCount = false;
  message: string;
  customMessageForSelection = 'Row';
  constructor() { }

  getSelectedRows(): Observable<any> {
    return this._selectedRows.asObservable();
  }

  setSelectedRows(value) {
    this._selectedRows.next(value._selected);
  }
}
