import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from 'src/app/service/authentification.service';

interface Poste {
  value: string;
}

interface telephone {
  value: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthentificationService,
    private router: Router
  ) {}

  Poste: Poste[] = [{value:"IT"}, {value:"RH"},{value:"Finance"},{value:"Comptabilité"}
  ]

  telephone: telephone[] = [{value:"Samsung S21"}, {value:"Samsung A13"},{value:"Samsung M51"}
]
  registerform = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    name: this.builder.control('', Validators.required),
    prenom: this.builder.control('', Validators.required),
    poste: this.builder.control('',Validators.required),
    Telephone: this.builder.control('',Validators.required),
    number: this.builder.control('',Validators.required)
  });

  proceedRegistration() {
    if (this.registerform.valid) {
      this.service
        .ProceedRegister(this.registerform.value)
        .subscribe( res => {
          this.toastr.success("Inscription reussi.");
          this.router.navigate(['login'])
        });
    } else {
      this.toastr.warning('Veuillez remplir tous les champs.');
    }
  }
}
