import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Displays a Success Message
   
  onSuccess() {
    this.snackBar.open('Success!', null, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }
  */


  /**
   * Displays a Success Message
   */
  onSuccess(message?: string, duration?: number) {
    if (message && duration)
      this.snackBar.open(message, null, {
        duration: duration,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success'],
      });
    else if (message)
      this.snackBar.open(message, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success'],
      });

    else
      this.snackBar.open('Success!', null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success'],
      });

  }


  /**
   * Displays an Error Message
   */
  onError() {
    this.snackBar.open('Error', null, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error'],
    });
  }



}
