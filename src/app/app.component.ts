import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { StorageActions } from './store/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'jack-frost';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(StorageActions.REHYDRATE());
  }
}
