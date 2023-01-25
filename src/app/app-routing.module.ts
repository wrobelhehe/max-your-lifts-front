import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './home/home.component';
import { RouterGuardService } from './services/router-guard.service';
import { MainHomeComponent } from './main-home/main-home.component';
import { HomeGuard } from './services/home-guard.service';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [HomeGuard]


  },
  {
    path: 'max-your-lifts',
    component: MainHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'plans',
        pathMatch: 'full',

      },
      {
        path: '',
        loadChildren:
          () => import('./main-home/nav-components/nav-components.module').then(m => m.NavComponentsModule),
        canActivate: [RouterGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }
      },

    ]
  },
  {
    path: '**', component: HomeComponent,
    canActivate: [HomeGuard]

  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [RouterGuardService],
  exports: [RouterModule],
})
export class AppRoutingModule { }
