import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponentsRoutes } from './nav-components.routing';
import { MaterialModule } from 'src/app/shared/material.module';
import { ManagePlansComponent } from './manage-plans/manage-plans.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NavComponentsRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
  ]
})
export class NavComponentsModule { }
