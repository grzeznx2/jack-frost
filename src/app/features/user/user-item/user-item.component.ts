import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectDeleteUserLoading } from 'src/app/store/user';
import { User, UserId } from '../user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserItemComponent implements OnInit {
  @Input() user!: User;
  @Output() userSelected = new EventEmitter<UserId>();

  public loading$ = of(false);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectDeleteUserLoading(this.user.id));
  }

  selectUser() {
    this.userSelected.emit(this.user.id);
  }
}
