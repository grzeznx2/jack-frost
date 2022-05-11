import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Role } from 'src/app/features/user/user.model';
import { AppState } from 'src/app/store/app.state';
import { selectUserRole } from 'src/app/store/auth';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectUserRole).pipe(
      map((role) => {
        if (!role) return false;
        if ((route.data['requiredRole'] as Role) === 'ADMIN') {
          return this.requireAdmin(role);
        } else {
          return this.requireUser(role);
        }
      })
    );
  }

  private requireAdmin(role: Role) {
    if (role === 'ADMIN') return true;
    return this.router.createUrlTree(['/']);
  }

  private requireUser(role: Role) {
    if (role === 'USER') return true;
    return this.router.createUrlTree(['/']);
  }
}
