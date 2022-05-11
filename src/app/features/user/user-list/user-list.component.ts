import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  selectUsersError,
  selectUsersList,
  selectUsersLoading,
  UserActions,
} from 'src/app/store/user';
import { UserSubscriptionService } from '../user-subscription.service';
import { UserId } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnDestroy {
  users$ = this.store.select(selectUsersList);
  loading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);

  constructor(
    private store: Store<AppState>,
    private subService: UserSubscriptionService
  ) {}

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

  deleteUser(id: UserId) {
    this.store.dispatch(UserActions.DELETE_USER({ id }));
  }
}
