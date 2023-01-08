import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaxYourLiftsModule } from './max-your-lifts.module';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from "ngx-ui-loader"
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';

import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DragDropModule } from '@angular/cdk/drag-drop';




const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',

  textColor: '#f5f8ff',
  textPosition: 'center-center',

  gap: 100,
  pbColor: '#004d40',
  bgsColor: "#f5f8ff",
  bgsSize: 100,
  fgsColor: '#f5f8ff',
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 150,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,

}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaxYourLiftsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatSnackBarModule,
    SharedModule,
    DragDropModule






  ],
  providers: [HttpClientModule, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
