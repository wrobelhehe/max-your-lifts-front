import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_Decode from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constans';
import { AuthorizationService } from './authorization.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(private auth: AuthorizationService,
    private router: Router,
    private snackbarService: SnackbarService) { }



  canActivate(route: ActivatedRouteSnapshot): boolean {

    let expectedRoleArray: any = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole
    const accessToken: any = localStorage.getItem('accessToken')
    var accessTokenPayLoad: any;
    try {
      accessTokenPayLoad = jwt_Decode(accessToken)
    }
    catch (err) {
      localStorage.clear()
      this.router.navigate(['/'])
    }

    let checkRole = false;

    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == accessTokenPayLoad.role) {
        checkRole = true
      }
    }
    if (accessTokenPayLoad.role == 'user' || accessTokenPayLoad.role == 'admin') {
      if (this.auth.isAuthenticated() && checkRole) {
        return true
      }
      this.snackbarService.openToast(GlobalConstants.unauthorized, GlobalConstants.error)
      this.router.navigate(['/max-your-lifts/plans'])
      return false
    }
    else {
      this.router.navigate(['/'])
      localStorage.clear()
      return false
    }
  }
}
