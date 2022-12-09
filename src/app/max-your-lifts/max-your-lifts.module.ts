import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderNavComponent } from '../header/header-nav/header-nav.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { MidNavComponent } from '../home/mid-nav/mid-nav.component';
import { TableComponent } from '../table/table.component';
import { MaterialModule } from '../shared/material.module';
import { SignupComponent } from '../signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { HeaderPlansComponent } from '../header-plans/header-plans.component';
import { MenuItems } from '../shared/menu-items';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { FooterPlansComponent } from '../footer-plans/footer-plans.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';



@NgModule({
  declarations: [HomeComponent, FooterPlansComponent, TableComponent, ConfirmComponent, HeaderComponent, FooterComponent, MidNavComponent, HeaderNavComponent, SignupComponent, ForgotPasswordComponent, LoginComponent, HeaderPlansComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [{ provide: MenuItems, useClass: MenuItems }]

})
export class MaxYourLiftsModule { }
