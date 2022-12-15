import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './home/home.component';
import { RouterGuardService } from './services/router-guard.service';
import { MainHomeComponent } from './main-home/main-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'max-your-lifts',
    component: MainHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'max-your-lifts/plans',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./main-home/nav-components/nav-components.module').then(m => m.NavComponentsModule),
      },
      {
        path: 'plans',
        loadChildren: () => import('./main-home/plans/plans.module').then(m => m.PlansModule),
        canActivate: [RouterGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }
      },

    ]
  },
  {
    path: '**', component: HomeComponent
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
