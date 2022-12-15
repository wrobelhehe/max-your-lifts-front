import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/dialog/login/login.component';
import { SignupComponent } from 'src/app/dialog/signup/signup.component';


@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent {

  constructor(private dialog: MatDialog
  ) {

  }
  isNavMenuOpen: boolean = true


  toggleNavMenu(): void {
    this.isNavMenuOpen = !this.isNavMenuOpen;


  }

  afterClick(): void {
    this.isNavMenuOpen = true;

  }

  changeStyles() {
    return this.isNavMenuOpen ? '100% 0  0 -100%' : '14% 0  0 0'
  }





  signUp(): void {
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
