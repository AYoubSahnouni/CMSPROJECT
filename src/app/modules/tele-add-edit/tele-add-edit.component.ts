import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Telephone } from 'src/app/model/telephone';
import { TelephoneService } from 'src/app/service/telephone.service';

@Component({
  selector: 'app-tele-add-edit',
  templateUrl: './tele-add-edit.component.html',
  styleUrls: ['./tele-add-edit.component.scss']
})
export class TeleAddEditComponent {
  empForm: FormGroup;

  constructor(private TeleService: TelephoneService,private fb: FormBuilder,private dialogRef: MatDialogRef<TeleAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){
    this.empForm = this.fb.group({
      name:'',
      marque: '',
      numero_serie:'',
      model: '',
      etat:'',
      montant:'',
      numero_facture:'',
      date_acquisition:''
    })
}

  onFormSubmit(){
    if (this.empForm.valid) {
      const tele: Telephone = this.empForm.value;
      console.log(tele)
      this.TeleService.addPhone(tele).subscribe(
        data => {
          console.log('Telephone ajouté avec succès :', data);
          this.empForm.reset();
          this.dialogRef.close(tele); // Pass the user data to the parent component
        },
        error => {
          console.error('Erreur lors de l\'ajout du telephone :', error);
        }
      );
    }
  }
}
