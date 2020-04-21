import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private route: Router,
    ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isAuthencated()) {
        // authorised so return true
        return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.route.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }

  isAuthencated(): boolean {
    return (localStorage.getItem('apikey') ? true : false );
  }
}
