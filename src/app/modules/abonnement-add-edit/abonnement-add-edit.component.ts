import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Abonnement } from 'src/app/model/abonnement';
import { AbonnementService } from 'src/app/service/abonnement.service';

@Component({
  selector: 'app-abonnement-add-edit',
  templateUrl: './abonnement-add-edit.component.html',
  styleUrls: ['./abonnement-add-edit.component.scss']
})
export class AbonnementAddEditComponent {

  empForm!:FormGroup;

  constructor(private Service: AbonnementService,private fb: FormBuilder,private dialogRef: MatDialogRef<AbonnementAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){
    this.empForm = this.fb.group({
      nom:'',
      forfeit:'',
      montant: '',
      remise:'',
    })
  }

  onFormSubmit(){
    if (this.empForm.valid) {
      const tele: Abonnement = this.empForm.value;
      console.log(tele)
      this.Service.addAbonnement(tele).subscribe(
        data => {
          console.log('Abonnement ajouté avec succès :', data);
          this.empForm.reset();
          this.dialogRef.close(tele); // Pass the user data to the parent component
        },
        error => {
          console.error('Erreur lors de l\'ajout abonnement :', error);
        }
      );
    }
  }
}
