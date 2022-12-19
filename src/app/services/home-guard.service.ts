import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {
    constructor(private authService: AuthorizationService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.checkAccessToken()) {
            return true
        }
        this.router.navigate(['/max-your-lifts/plans'])
        return false
    }
}