import { Routes } from "@angular/router";
import { RouterGuardService } from "src/app/services/router-guard.service";
import { ManageCategoryComponent } from "./manage-category/manage-category.component";


export const NavComponentsRoutes: Routes = [

    {
        path: 'category',
        component: ManageCategoryComponent,
        canActivate: [RouterGuardService],
        data: {
            expectedRole: ['admin']
        }
    }
]