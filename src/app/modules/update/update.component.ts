import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { EmployeService } from 'src/app/service/employe.service';
import { TelephoneService } from 'src/app/service/telephone.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  empForm: FormGroup;

  telephones!: any;

  constructor(private route: ActivatedRoute,private TeleService: TelephoneService ,private userService : EmployeService,private fb: FormBuilder,    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){
    this.empForm = this.fb.group({
      id:'',
      matricule:'',
      nom:'',
      prenom:'',
      poste:'',
      siege:'',
      number:'',
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


  close() {
    this.dialogRef.close();
  }

  onFormSubmit(){
    if (this.empForm.valid) {
      const user: User = this.empForm.value;
      console.log(user);
      this.userService.update(user).subscribe(
        data => {
          console.log('Utilisateur modifier avec succès :', data);
          this.empForm.reset();
          this.dialogRef.close(user); // Pass the user data to the parent component
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        }
      );
    }
  }



  ngOnInit(){
    this.fetchtele();
    this.empForm.patchValue({
      id:this.data.employee.id,
      matricule: this.data.employee.matricule,
      nom:this.data.employee.nom,
      prenom:this.data.employee.prenom,
      poste:this.data.employee.poste,
      siege:this.data.employee.siege,
      number:this.data.employee.number,
      telephone:this.data.employee.telephone
    });

  }

}
