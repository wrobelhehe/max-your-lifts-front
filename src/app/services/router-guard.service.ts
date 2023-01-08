import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_Decode from 'jwt-decode';
import { map, Observable, of } from 'rxjs';
import { GlobalConstants } from '../shared/global-constans';
import { AuthorizationService } from './authorization.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(private auth: AuthorizationService,
    private router: Router,
    private snackbarService: SnackbarService, private authService: AuthorizationService) { }



  canActivate(route: ActivatedRouteSnapshot): boolean {




    let expectedRoleArray: any = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole
    const accessToken: any = this.authService.getAccessToken()
    var tokenPayLoad: any;
    try {
      tokenPayLoad = jwt_Decode(accessToken)
      console.log(tokenPayLoad)
    }
    catch (err) {
      localStorage.clear()
      this.router.navigate(['/'])
    }

    let checkRole = false;

    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == tokenPayLoad.role) {
        checkRole = true
      }
    }
    if (tokenPayLoad.role == 'user' || tokenPayLoad.role == 'admin') {
      if (this.authService.isAuthenticated() && checkRole) {
        return true
      } else {
        this.snackbarService.openToast(GlobalConstants.unauthorized, GlobalConstants.error)
        this.router.navigate(['/max-your-lifts/plans'])
        // localStorage.clear()
        return false
      }

    }
    else {
      this.router.navigate(['/max-your-lifts/plans'])
      // localStorage.clear()
      return false
    }

  }



}






