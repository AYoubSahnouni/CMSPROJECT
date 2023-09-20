import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultsComponent } from './layouts/defaults/defaults.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { TelephonesComponent } from './modules/telephones/telephones.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { EmployesComponent } from './modules/employes/employes.component';
import { AbonnementComponent } from './modules/abonnement/abonnement.component';
import { LogComponent } from './modules/log/log.component';
import { AuthentificationGuard } from './guard/authentification.guard';
import { GloginGuard } from './guard/glogin.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,canActivate:[GloginGuard]
  },
  {
  path: 'dashboard',
  component: DefaultsComponent,canActivate:[AuthentificationGuard],
  children:[{
    path: '',
    component: DashboardComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'telephones',
    component: TelephonesComponent
  },
  {
    path: 'employes',
    component: EmployesComponent
  },
  {
    path: 'abonnement',
    component: AbonnementComponent
  },  {
    path: 'logs',
    component: LogComponent
  }
]

},
  {
    path: 'login',
    redirectTo: ''
  }
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
