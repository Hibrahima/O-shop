import { UserService } from './user.service';
import { CanActivate } from '@angular/router/';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectAuthGuard implements CanActivate{

  constructor(private authSerice: AuthService, private router: Router, private userService: UserService) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
   return this.authSerice.afAuth.auth.getRedirectResult().then(result => {
      if(result.user != null) {
        /* there is a user logged in, so redirects to the origin url
           and save this user 
        */

        this.userService.save(result.user);
        this.router.navigateByUrl(localStorage.getItem('returnUrl'));
        return false;
      }
      return true;
    });
  }
}
