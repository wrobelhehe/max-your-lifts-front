import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderNavComponent } from '../header/header-nav/header-nav.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { MidNavComponent } from '../home/mid-nav/mid-nav.component';
import { SideNavComponent } from '../table/side-nav/side-nav.component';
import { TableComponent } from '../table/table.component';
import { MaterialModule } from '../material/material.module';
import { SignupComponent } from '../signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';



@NgModule({
  declarations: [ HomeComponent, TableComponent, HeaderComponent, SideNavComponent, FooterComponent, MidNavComponent, HeaderNavComponent, DashboardComponent,SignupComponent,  ForgotPasswordComponent, LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class MaxYourLiftsModule { }
