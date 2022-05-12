import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectUserRole } from 'src/app/store/auth';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.store.select(selectUserRole).pipe(
      map((role) => {
        if (!role) return this.router.createUrlTree(['login']);
        else if (route.data && route.data['requiredRole'] === role) {
          return true;
        } else if (route.data && route.data['requiredRole'] !== role) {
          if (role === 'ADMIN') return this.router.createUrlTree(['/users']);
          if (role === 'USER')
            return this.router.createUrlTree(['/order-creator']);
        }
        return true;
      })
    );
  }
}
