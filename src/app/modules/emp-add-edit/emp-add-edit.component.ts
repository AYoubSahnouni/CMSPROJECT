import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { EmployeService } from 'src/app/service/employe.service';
import { TelephoneService } from 'src/app/service/telephone.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {

  abonnements!:any;
  telephones!: any;
  empForm: FormGroup;
  router: any;
  employe!: User;

  constructor(private TeleService: TelephoneService ,private userService : EmployeService,private fb: FormBuilder,private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){
      this.empForm = this.fb.group({
        matricule:'',
        nom:'',
        prenom:'',
        poste:'',
        affectation:'',
        number:'',
        abonnement: this.fb.group({
          id:''
        }),
        telephone: this.fb.group({
          id:''
        })
      })
  }

  fetchtele(){
    this.TeleService.getphones().subscribe(data=> {
      this.telephones = data.map((item: any) => item);
      console.log('list of telephones', this.telephones);
    });
  }


  fetchabonnement(){
    this.userService.fetchabonnement().subscribe(data=> {
      this.abonnements = data.map((item: any) => item);
      console.log('list of abonnements', this.abonnements);
    });
  }
  close() {
    this.dialogRef.close();
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);
      this.userService.addUser(this.empForm.value).subscribe(
        data => {
          console.log('Utilisateur ajouté avec succès :', data);
          this.empForm.reset();
          this.dialogRef.close(this.empForm.value); // Pass the user data to the parent component
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        }
      );
    }
  }
  selected = 'option2';


  ngOnInit() {
    this.fetchtele();
    this.fetchabonnement();
  }
}
