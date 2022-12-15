import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router) {

  }

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      this.router.navigate(["/"])
      return false
    }
    else {
      return true
    }
  }


}
