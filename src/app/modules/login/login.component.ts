import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { User } from 'src/app/model/user';
import { error } from 'highcharts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthentificationService,
    private router: Router
  ) {
    this.loginform=this.builder.group({
      matricule:['',Validators.required],
      password:['',Validators.required]
    })
  }

  user!: any;
  u: any;
  loginform!: FormGroup;

  proceedlogin() {
    this.user = {"matricule":this.loginform.get('matricule')?.value,"password":this.loginform.get('password')?.value};
    this.service.login(this.user).subscribe(data => {
      this.u = data;
      sessionStorage.setItem('user', JSON.stringify(data));
      console.log(this.u);
      alert("login Successfully")
      this.router.navigate(['/dashboard'])
    }, error => alert("Matricule ou Mot de passe Incorrect!!!"))
  }
}
