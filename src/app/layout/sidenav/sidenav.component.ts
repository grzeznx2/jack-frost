import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthActions, selectAuthLoading, selectUser } from 'src/app/store/auth';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Output() sidenavToggled = new EventEmitter<void>();

  user$ = this.store.select(selectUser);
  loading$ = this.store.select(selectAuthLoading);

  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(AuthActions.LOGOUT_USER());
  }

  toggleSidenav() {
    this.sidenavToggled.emit();
  }
}
