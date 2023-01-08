
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private userService: UserService, private authService: AuthorizationService, private dialog: MatDialog,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.authService.getRefreshToken() || !this.authService.getAccessToken()) {
      localStorage.clear()
      this.router.navigate(['/']);
      if (this.router.url !== '/') {
        localStorage.clear()
        this.dialog.closeAll()
      }
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getAccessToken()}`
        }
      });
    }


    return next.handle(request).pipe(

      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {



          return this.authService.getNewToken().pipe(
            switchMap((response: any) => {
              // Update the headers with the new access token
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`
                }
              });
              // Retry the original request with the new headers
              return next.handle(request);
            }),
            catchError((refreshError: HttpErrorResponse) => {


              return throwError(refreshError);
            })
          );

        }
        // If the error is not a 401 or 403, just throw it
        return throwError(err);
      })
    );
  }
}
