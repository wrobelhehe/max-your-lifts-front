import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jwt_Decode from 'jwt-decode';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MenuItems } from '../shared/menu-items';

@Component({
  selector: 'app-header-plans',
  templateUrl: './header-plans.component.html',
  styleUrls: ['./header-plans.component.scss']
})
export class HeaderPlansComponent {
  token: any = localStorage.getItem('token')
  tokenPayLoad: any

  role: any

  constructor(public menuItems: MenuItems, private ngxService: NgxUiLoaderService, private router: Router, private dialog: MatDialog) {
    this.tokenPayLoad = jwt_Decode(this.token)
  }

  logout(): void {

    const dialogConfig = new MatDialogConfig()

    dialogConfig.data = {
      message: 'Logout'
    };

    const dialogRef = this.dialog.open(ConfirmComponent, dialogConfig)
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      this.ngxService.start();

      dialogRef.close();
      this.ngxService.stop();
      localStorage.clear()
      this.router.navigate(["/"])
    })


  }

  changePassword(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "650px"
    this.dialog.open(ChangePasswordComponent, dialogConfig)
  }

}
