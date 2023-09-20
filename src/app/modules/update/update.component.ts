import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  dataphonechangit:boolean = false;
  telephones!: any;
  formnotvalid:boolean=true;
  abonnements: any;
  option1: boolean = true;

  constructor(private TeleService: TelephoneService ,private userService : EmployeService,private fb: FormBuilder,    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.empForm = this.fb.group({
      id:['',Validators.required],
      matricule:['',Validators.required],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      poste:['',Validators.required],
      affectation:['',Validators.required],
      number:['',Validators.required],
      telephone: this.fb.group({
        id:'',
        motif:['',Validators.required],
        commantaire:['',Validators.required]
      }),
      abonnement: this.fb.group({
        id:''
      })
    })
  }

  changemydataphone(id:any){
    console.log(this.data.employee?.telephone);
    console.log(id);
    if(this.data.employee?.telephone==null){
      this.dataphonechangit = false;
    }

    else if (this.data.employee?.telephone?.id==id) {

      this.dataphonechangit = false;
    } else {

      this.dataphonechangit = true;
    }

  }

  fetchtele(){
    this.TeleService.getphones().subscribe(data=> {
      this.telephones = data;
      // console.log('all phones',   this.telephones);
      this.telephones=this.telephones.filter((tel:any)=>tel.etat!="Hors Service");
      //this.telephones = data.map((item: any) => item);
      console.log('list of telephones',   this.telephones.filter((tel:any)=>tel.etat!="Hors Service"));
    });
  }


  close() {
    this.dialogRef.close();
  }

  onFormSubmit(){

   if (this.dataphonechangit) {
    console.log("data chgit : "+this.dataphonechangit);

    const tel = this.empForm.get("telephone")?.value?.id;
    const abon = this.empForm.get("abonnement")?.value?.id;

    console.log("tele change to no telepjone "+tel);
    if (tel==='null') {
      this.empForm.patchValue({
        telephone:{
          id:null
        }
      })
    }

    if (abon==='null') {
      this.empForm.patchValue({
        abonnement:{
          id:null
        }
      })
    }

   }
   else{
    console.log("data chgit : "+this.dataphonechangit);

    const formemp = this.empForm.get("telephone") as FormGroup;
    formemp.removeControl('motif');
    formemp.removeControl('commantaire');
   }

    if (this.empForm.valid) {
      this.formnotvalid =true;
      const user: User = this.empForm.value;
      console.log(user);

      this.userService.update(user).subscribe(
        data => {
          console.log('Utilisateur modifier avec succès :', data);
          this.empForm.reset();
          this.dialogRef.close(user); // Pass the user data to the parent component
        },
        error => {
          console.error('Erreur lors de modification de l\'utilisateur :', error);
        }
      );
    }
    else{
      this.formnotvalid = false;
      console.log(this.empForm.valid);
    }
  }

  option: boolean = true;

  fetchabonnement(){
    this.userService.fetchabonnement().subscribe(data=> {
      this.abonnements = data.map((item: any) => item);
      console.log('list of abonnements', this.abonnements);
    });
  }

  ngOnInit(){
    this.fetchtele();
    this.fetchabonnement();
    console.log(this.data.employee)
    this.empForm.patchValue({
      id:this.data.employee.id,
      matricule: this.data.employee.matricule,
      nom:this.data.employee.nom,
      prenom:this.data.employee.prenom,
      poste:this.data.employee.poste,
      affectation:this.data.employee.affectation,
      number:this.data.employee.number,
      telephone:this.data.employee.telephone,
      abonnement:this.data.employee.abonnement
    });
      if(this.data.employee.telephone!=null){
          this.option = true;
      }
      else{
          this.option = false;
      }
      if(this.data.employee.abonnement!=null){
        this.option1 = true;
      }
      else{
          this.option1 = false;
      }
  }

}
