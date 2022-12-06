import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  openToast(message: string, action: string) {
    if(action ==='error') {
      this.snackbar.open(message,'',{
        horizontalPosition:'left',
        verticalPosition: 'bottom',
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    }
    else {
      this.snackbar.open(message,'',{
        horizontalPosition:'left',
  
        verticalPosition: 'bottom',
        duration: 5000,
        panelClass: ['green-snackbar']
      })
    }
  }
}
