import { Routes } from "@angular/router";
import { RouterGuardService } from "src/app/services/router-guard.service";
import { ManageCategoryComponent } from "./manage-category/manage-category.component";
import { ManageExerciseComponent } from "./manage-exercise/manage-exercise.component";
import { ManagePlansComponent } from "./manage-plans/manage-plans.component";


export const NavComponentsRoutes: Routes = [

    {
        path: 'plans',
        component: ManagePlansComponent,
        canActivate: [RouterGuardService],
        data: {
            expectedRole: ['admin', 'user']
        }
    },

    {
        path: 'category',
        component: ManageCategoryComponent,
        canActivate: [RouterGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    {
        path: 'exercise',
        component: ManageExerciseComponent,
        canActivate: [RouterGuardService],
        data: {
            expectedRole: ['admin']
        }
    }
]