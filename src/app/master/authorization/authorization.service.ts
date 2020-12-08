import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {
  constructor(private router: Router) {}
  canActivate = (): boolean => {
    const value = localStorage.getItem("Value");
    const sum = localStorage.getItem("Sum");
    if (parseInt(value) !== parseInt(sum)) {
      this.router.navigate(['/master/chart']);
    }
    return true;
  }
}
