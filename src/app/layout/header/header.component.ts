import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthActions, selectAuthLoading, selectUser } from 'src/app/store/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$ = this.store.select(selectUser);
  loading$ = this.store.select(selectAuthLoading);

  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(AuthActions.LOGOUT_USER());
  }
}
