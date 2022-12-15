import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PlansComponent } from './plans.component';
import { PlansRoutes } from './plans.routing';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(PlansRoutes)
    ],
    declarations: [PlansComponent]
})
export class PlansModule { }
