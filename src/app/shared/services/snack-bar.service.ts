import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(
    message: string,
    action: string | undefined = undefined,
    duration: number = 3000
  ) {
    /*
    TODO:
    Znaleźć przyczynę, dlaczego Firebase wyrzuca ten błąd, nawet jeżeli email nie jest w użyciu
    */
    if (
      message ===
      'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'
    )
      return;
    this.snackBar.open(message, action, { duration });
  }
}
