import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AuthActions, selectAuthLoading } from 'src/app/store/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public loading$ = this.store.select(selectAuthLoading);

  public form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    ]),
  });

  get firstName() {
    return this.form.get('firstName')!;
  }

  get lastName() {
    return this.form.get('lastName')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  get email() {
    return this.form.get('email')!;
  }

  constructor(private store: Store<AppState>) {}

  submit() {
    if (this.form.invalid) return;
    this.store.dispatch(
      AuthActions.REGISTER_USER({
        user: {
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          password: this.password.value,
          email: this.email.value,
        },
      })
    );
  }
}
