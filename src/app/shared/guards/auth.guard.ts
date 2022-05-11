import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectLoggedIn } from 'src/app/store/auth';

export enum RequiredAuthStatus {
  AUTHENTICATED,
  UNAUTHENTICATED,
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot) {
    return this.store.select(selectLoggedIn).pipe(
      map((isLoggedIn) => {
        if (
          route.data['requiredAuthStatus'] === RequiredAuthStatus.AUTHENTICATED
        ) {
          return this.requireAuthenticate(isLoggedIn);
        } else {
          return this.requireUnauthenticate(isLoggedIn);
        }
      })
    );
  }

  private requireAuthenticate(isLoggedIn: boolean) {
    if (!isLoggedIn) {
      return this.router.createUrlTree(['login']);
    }
    return true;
  }

  private requireUnauthenticate(isLoggedIn: boolean) {
    if (isLoggedIn) {
      return this.router.createUrlTree(['']);
    }
    return true;
  }
}
