import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSerice: AuthService, private router: Router) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // returns true if the user is logged in
    return this.authSerice.user$.pipe(map(user => {
      // user is logged in, so return true
      if(user) return true;

      // return false when no user is logged in and redirects to login
      // return url is retrived at a later time to navigate the user to the origin url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
      return false;
    }));
  }
}
