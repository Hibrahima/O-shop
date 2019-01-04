import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private userService: UserService, private authService: AuthService) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    // return the isAdmin field of the user stored in firebase, NOT the firebase.User
     return this.authService.appUser$
       .pipe(map(appUser => appUser.isAdmin)); 
  }
}
