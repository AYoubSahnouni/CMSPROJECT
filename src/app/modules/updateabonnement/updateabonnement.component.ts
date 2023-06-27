import { Component , Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Abonnement } from 'src/app/model/abonnement';
import { AbonnementService } from 'src/app/service/abonnement.service';

@Component({
  selector: 'app-updateabonnement',
  templateUrl: './updateabonnement.component.html',
  styleUrls: ['./updateabonnement.component.scss']
})
export class UpdateabonnementComponent {

  empForm!:FormGroup;

  constructor(private Service: AbonnementService,private fb: FormBuilder,private dialogRef: MatDialogRef<UpdateabonnementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.empForm = this.fb.group({
        id:'',
        nom:'',
        forfeit:'',
        montant:'',
        remise:''
      })
  }

  close() {
    this.dialogRef.close();
  }

  onFormSubmit(){
    const ab: Abonnement = this.empForm.value;
    if (this.empForm.valid) {
      console.log(ab);
      this.Service.update(ab).subscribe(
        data => {
          console.log('Abonnement modifier avec succès :', data);
          this.empForm.reset();
          this.dialogRef.close(ab); // Pass the user data to the parent component
        },
        error => {
          console.error('Erreur lors de la modification abonnement :', error);
        }
      );
    }
  }

  ngOnInit(){
    console.log(this.data.abonnement);
    this.empForm.patchValue({
      id:this.data.abonnement.id,
      nom: this.data.abonnement.nom,
      forfeit: this.data.abonnement.forfeit,
      montant:this.data.abonnement.montant,
      remise:this.data.abonnement.remise,
    });
  }


}
