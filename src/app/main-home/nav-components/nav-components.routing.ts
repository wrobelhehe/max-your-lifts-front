import { Routes } from "@angular/router";
import { RouterGuardService } from "src/app/services/router-guard.service";
import { ExerciseComponent } from "./exercise/exercise.component";
import { ManageCategoryComponent } from "./manage-category/manage-category.component";
import { PlansComponent } from "./plans/plans.component";


export const NavComponentsRoutes: Routes = [

    {
        path: 'plans',
        component: PlansComponent,
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
        component: ExerciseComponent,
        canActivate: [RouterGuardService],
        data: {
            expectedRole: ['admin']
        }
    }
]