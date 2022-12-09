import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './home/home.component';
import { RouterGuardService } from './services/router-guard.service';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'max-your-lifts',
    component: TableComponent,
    children: [
      {
        path: '',
        redirectTo: 'max-your-lifts/plans',
        pathMatch: 'full'
      },

      {
        path: 'plans',
        loadChildren: () => import('./max-your-lifts/max-your-lifts.module').then(m => m.MaxYourLiftsModule),
        canActivate: [RouterGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }
      }
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
