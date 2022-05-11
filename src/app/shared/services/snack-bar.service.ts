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
    this.snackBar.open(message, action, { duration });
  }
}
