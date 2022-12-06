import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MaxYourLiftsModule } from './max-your-lifts/max-your-lifts.module';
import {NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION} from "ngx-ui-loader"
import { MatSnackBarModule } from '@angular/material/snack-bar';




const ngxUiLoaderConfig : NgxUiLoaderConfig  = {
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
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaxYourLiftsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatSnackBarModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
