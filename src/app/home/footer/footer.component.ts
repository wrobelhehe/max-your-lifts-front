import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../dialog/login/login.component';
import { SignupComponent } from '../../dialog/signup/signup.component';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  constructor(private dialog: MatDialog) {

  }
  signUp() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '650px';
    this.dialog.open(SignupComponent, dialogConfig)
  }


  login(): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "650px";
    this.dialog.open(LoginComponent, dialogConfig)
  }
}
