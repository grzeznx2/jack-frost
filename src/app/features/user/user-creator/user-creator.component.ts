import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { UserActions } from 'src/app/store/user';

@Component({
  selector: 'app-user-creator',
  templateUrl: './user-creator.component.html',
  styleUrls: ['./user-creator.component.scss'],
})
export class UserCreatorComponent {
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

  constructor(private store: Store<AppState>) {}

  submit() {
    this.store.dispatch(
      UserActions.ADD_USER({
        user: {
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          password: this.password.value,
        },
      })
    );
  }
}
