import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router/';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    public afAuth : AngularFireAuth, 
    private route: ActivatedRoute, 
    private userService: UserService,
    private router: Router) {
    this.user$ = afAuth.authState;
   }

  loginWithGoogle(){
    // gets the returl url from the activated route
    // the return url was injected by the auth guard as a query param
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl); 

    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/');
  }

  get appUser$() : Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => {
        if(user) return this.userService.get(user.uid);

        return of(null);
        }));
  }
}
