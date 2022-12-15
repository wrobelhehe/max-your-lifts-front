import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderNavComponent } from './header/header-nav/header-nav.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MidNavComponent } from './home/mid-nav/mid-nav.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { MaterialModule } from './shared/material.module';
import { SignupComponent } from './dialog/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './dialog/forgot-password/forgot-password.component';
import { LoginComponent } from './dialog/login/login.component';
import { HeaderPlansComponent } from './main-home/header-plans/header-plans.component';
import { MenuItems } from './shared/menu-items';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { FooterPlansComponent } from './main-home/footer-plans/footer-plans.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageCategoryComponent } from './main-home/nav-components/manage-category/manage-category.component';




@NgModule({
  declarations: [HomeComponent, FooterPlansComponent, MainHomeComponent, ConfirmComponent, HeaderComponent, FooterComponent, MidNavComponent, HeaderNavComponent, SignupComponent, ForgotPasswordComponent, LoginComponent, HeaderPlansComponent, ChangePasswordComponent, ManageCategoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

  ],
  providers: [{ provide: MenuItems, useClass: MenuItems }]

})
export class MaxYourLiftsModule { }
