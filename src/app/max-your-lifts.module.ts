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
import { CategoryComponent } from './dialog/category/category.component';
import { ManageExerciseComponent } from './main-home/nav-components/manage-exercise/manage-exercise.component';
import { ExerciseComponent } from './dialog/exercise/exercise.component';
import { ExerciseCategoryPipe } from './dialog/exercise/exerciseCategory.pipe';
import { ManagePlansComponent } from './main-home/nav-components/manage-plans/manage-plans.component';
import { PlansComponent } from './dialog/plans/plans.component';
import { ViewPlanComponent } from './dialog/view-plan/view-plan.component';
import { VideoPlayerComponent } from './dialog/video-player/video-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SafePipe } from './dialog/video-player/safe.pipe';





@NgModule({
  declarations: [HomeComponent, FooterPlansComponent, MainHomeComponent, ConfirmComponent, CategoryComponent, HeaderComponent, FooterComponent, MidNavComponent, HeaderNavComponent, SignupComponent, ForgotPasswordComponent, LoginComponent, HeaderPlansComponent, ChangePasswordComponent, ManageCategoryComponent, ManageExerciseComponent, ExerciseComponent, ExerciseCategoryPipe, ManagePlansComponent, PlansComponent, ViewPlanComponent, VideoPlayerComponent, SafePipe],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    YouTubePlayerModule

  ],
  providers: [{ provide: MenuItems, useClass: MenuItems }]

})
export class MaxYourLiftsModule { }
