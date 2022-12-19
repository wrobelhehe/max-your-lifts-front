import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jwt_Decode from 'jwt-decode';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ChangePasswordComponent } from '../../dialog/change-password/change-password.component';
import { ConfirmComponent } from '../../dialog/confirm/confirm.component';
import { MenuItems } from '../../shared/menu-items';

@Component({
  selector: 'app-header-plans',
  templateUrl: './header-plans.component.html',
  styleUrls: ['./header-plans.component.scss']
})
export class HeaderPlansComponent {
  accessToken: any = localStorage.getItem('accessToken')
  tokenPayLoad: any

  role: any

  opened: boolean = false

  constructor(public menuItems: MenuItems, private ngxService: NgxUiLoaderService, public router: Router, private dialog: MatDialog) {
    this.tokenPayLoad = jwt_Decode(this.accessToken)
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


  changeState(item: any): void {
    this.router.navigate(["/max-your-lifts/" + item])
  }

}
