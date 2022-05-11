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
        console.log(role);
        // if (!role) return this.router.createUrlTree(['/login']);
        if (!role) {
          this.router.navigateByUrl('/login');
          return false;
        }
        if ((route.data['requiredRole'] as Role) === 'ADMIN') {
          return this.requireAdmin(role);
        } else {
          return this.requireUser(role);
        }
      })
    );
  }

  private requireAdmin(role: Role) {
    console.log('HELLO 1!');
    if (role === 'ADMIN') return true;
    console.log('HELLO 2!');
    this.router.navigateByUrl('/order-creator');
    return false;
  }

  private requireUser(role: Role) {
    if (role === 'USER') return true;
    this.router.navigateByUrl('/order-creator');
    return false;
    // return this.router.createUrlTree(['/users']);
  }
}
