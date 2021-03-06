import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthActions, selectAuthLoading } from 'src/app/store/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  public loading$ = this.store.select(selectAuthLoading);

  public form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
  });

  get password() {
    return this.form.get('password')!;
  }

  get email() {
    return this.form.get('email')!;
  }

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.authService.unsubscribeComponent$.next();
  }

  submit() {
    if (this.form.invalid) return;
    this.store.dispatch(
      AuthActions.LOGIN_USER({
        user: {
          password: this.password.value,
          email: this.email.value,
        },
      })
    );
  }
}
