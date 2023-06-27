import { Component , Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Telephone } from 'src/app/model/telephone';
import { TelephoneService } from 'src/app/service/telephone.service';

@Component({
  selector: 'app-updatephone',
  templateUrl: './updatephone.component.html',
  styleUrls: ['./updatephone.component.scss']
})
export class UpdatephoneComponent {

  empForm!: FormGroup;

  constructor(private TeleService: TelephoneService,private fb: FormBuilder,private dialogRef: MatDialogRef<UpdatephoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.empForm = this.fb.group({
      id:'',
      name:'',
      marque:'',
      model:'',
      numero_serie:'',
      etat:'',
      montant:'',
      numero_facture:'',
      date_acquisition: ''
    })
  }

  close() {
    this.dialogRef.close();
  }

  onFormSubmit(){
    const tele: Telephone = this.empForm.value;
    if (this.empForm.valid) {
      this.TeleService.update(tele).subscribe(
        data => {
          console.log('Telephone modifier avec succès :', data);
          this.empForm.reset();
          this.dialogRef.close(tele); // Pass the user data to the parent component
        },
        error => {
          console.error('Erreur lors de la modification de telephone :', error);
        }
      );
    }
  }

  ngOnInit(){
    this.empForm.patchValue({
      id:this.data.telephone.id,
      name: this.data.telephone.name,
      marque:this.data.telephone.marque,
      model:this.data.telephone.model,
      numero_serie:this.data.telephone.numero_serie,
      numero_facture:this.data.telephone.numero_facture,
      etat:this.data.telephone.etat,
      montant:this.data.telephone.montant,
      date_acquisition:this.data.telephone.date_acquisition
    });
  }

}
