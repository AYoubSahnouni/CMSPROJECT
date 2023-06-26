import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultsComponent } from './defaults.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { EmployesComponent } from 'src/app/modules/employes/employes.component';
import { TelephonesComponent } from 'src/app/modules/telephones/telephones.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
import { RegistrationComponent } from 'src/app/modules/registration/registration.component';
import { AbonnementComponent } from 'src/app/modules/abonnement/abonnement.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EmpAddEditComponent } from 'src/app/modules/emp-add-edit/emp-add-edit.component';
import { SearchbarComponent } from 'src/app/shared/widgets/searchbar/searchbar.component';
import { UpdateComponent } from 'src/app/modules/update/update.component';
import { TeleAddEditComponent } from 'src/app/modules/tele-add-edit/tele-add-edit.component';
import { AbonnementAddEditComponent } from 'src/app/modules/abonnement-add-edit/abonnement-add-edit.component';
import { UpdatephoneComponent } from 'src/app/modules/updatephone/updatephone.component';
import { UpdateabonnementComponent } from 'src/app/modules/updateabonnement/updateabonnement.component';
@NgModule({
  declarations: [
    DefaultsComponent,
    DashboardComponent,
    ProfileComponent,
    EmployesComponent,
    TelephonesComponent,
    LoginComponent,
    RegistrationComponent,
    LoginComponent,
    AbonnementComponent,
    EmpAddEditComponent,
    UpdateComponent,
    TeleAddEditComponent,
    AbonnementAddEditComponent,
    UpdateabonnementComponent,
    UpdatephoneComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ToastrModule.forRoot()
  ]
})
export class DefaultsModule { }
