import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private jwtHelper = new JwtHelperService();

  constructor(private router: Router, private userService: UserService) {

  }

  public checkAccessToken(): boolean {
    return localStorage.getItem('access_token') !== null && localStorage.getItem('refreshToken') !== null
  }


  private isTokenExpired(token: string): boolean | Promise<boolean> {
    return this.jwtHelper.isTokenExpired(token);
  }

  public getAccessToken(): any {
    return localStorage.getItem('accessToken');
  }

  public getRefreshToken(): any {
    return localStorage.getItem('refreshToken');
  }

  public getNewToken(): Observable<any> {
    if (!this.getRefreshToken()) {
      // If there is no refresh token, redirect to login and clear local storage
      this.router.navigate(['/']);
      localStorage.clear();
      // Return an empty observable to avoid breaking the application
      return of({});
    }
    return this.userService.getNewToken(this.getRefreshToken()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // The refresh token has expired or is invalid. Redirect to login.
          this.router.navigate(['/']);
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }



  public isAuthenticated(): boolean {
    if (!this.getAccessToken()) {

      this.router.navigate(["/"])
      return false
    } else {

      if (this.isTokenExpired(this.getAccessToken())) {
        if (this.getRefreshToken()) {
          this.getNewToken().subscribe((response: any) => {
            localStorage.setItem('accessToken', response.accessToken);
          });
          return true

        } else {

          this.router.navigate(["/"])
          return false
        }

      } else {
        return true
      }


    }
  }


}
