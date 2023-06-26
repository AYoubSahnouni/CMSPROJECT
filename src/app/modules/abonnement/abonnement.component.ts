import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AbonnementService } from 'src/app/service/abonnement.service';
import { AbonnementAddEditComponent } from '../abonnement-add-edit/abonnement-add-edit.component';
import { UpdateabonnementComponent } from '../updateabonnement/updateabonnement.component';
import { Abonnement } from 'src/app/model/abonnement';


@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent {

  ListAll!: Abonnement[];
  Abonnements!: any;
  nombre!: number;
  dataSource: any;
  matricule!: any[];
  numberinwi!: any;
  numberorange!: any;
  numberorange1!: any;
  numbermaroc: any;
  numbermaroc1: any;
  numberinwi1: any;
  constructor(private service:AbonnementService, private _dialog: MatDialog){

  }


  searching(event: any){
    console.log(event)
    var item = this.ListAll.filter( item =>
        item.nom.toLowerCase().includes(event.toLowerCase()) ||
        item.montant.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.remise.toString().toLowerCase().includes(event.toLowerCase())
    )
    this.dataSource = new MatTableDataSource(item);
  }

  fetchabonnements(){
      this.service.getAbonnement().subscribe(data => {
      this.Abonnements = data;
      this.ListAll = data;
      console.log(this.ListAll);
      this.Abonnements.forEach((res: any) => {
          if(res['nom']=='Orange' && res['montant']==20){
            res['naffectation'] = this.numberorange;
          }
          else if(res['nom']=='Orange' && res['montant']==10){
            res['naffectation'] = this.numberorange1;
          }
          else if(res['nom']=='Inwi' && res['montant']==20){
            res['naffectation'] = this.numberinwi;
          }
          else if(res['nom']=='Inwi' && res['montant']==10){
            res['naffectation'] = this.numberinwi1;
          }
          else if(res['nom']=='Maroc Telecom' && res['montant']==20){
            res['naffectation'] = this.numbermaroc;
          }
          else if(res['nom']=='Maroc Telecom' && res['montant']==10){
            res['naffectation'] = this.numbermaroc1;
          }
      });
      this.dataSource = new MatTableDataSource(this.Abonnements)
      console.log('list of users', this.Abonnements)
  })
  }

  openForm() {
    const dialogRef = this._dialog.open(AbonnementAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.fetchabonnements();
        }
      },
    });
  }

  deleteTele(id: number){
    console.log(id);
    this.service.deleteabonnement(id).subscribe({
      next: (res) => {
        alert('Employee deleted!');
        this.fetchabonnements();
      },
      error: console.log,
    });
  }

  openEditForm(ab: any) {
    const dialogRef = this._dialog.open(UpdateabonnementComponent, {
      data: {abonnement : ab}
    });

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.fetchabonnements();
        }
      },
    });
  }
  deleteEmployee(id: number){

  }


  displayedColumns: string[] = ["id","name","montant","remise","naffectation","action"];


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.service.getUsers().subscribe(data =>{
      const orange = data.filter((obj: any) => obj.abonnement?.nom === 'Orange' && obj.abonnement?.montant === 20 );
      this.numberorange = orange.length;
      const orange1 = data.filter((obj: any) => obj.abonnement?.nom === 'Orange' && obj.abonnement?.montant === 10 );
      this.numberorange1 = orange1.length;
      const maroc = data.filter((obj: any) => obj.abonnement?.nom === 'Maroc Telecom' && obj.abonnement?.montant === 20 );
      this.numbermaroc = maroc.length;
      const maroc1 = data.filter((obj: any) => obj.abonnement?.nom === 'Maroc Telecom' && obj.abonnement?.montant === 10 );
      this.numbermaroc1 = maroc1.length;
      const inwi = data.filter((obj: any) => obj.abonnement?.nom === 'Inwi'  && obj.abonnement?.montant === 20);
      this.numberinwi = inwi.length;
      const inwi1 = data.filter((obj: any) => obj.abonnement?.nom === 'Inwi'  && obj.abonnement?.montant === 10);
      this.numberinwi1 = inwi1.length;
    });
    this.fetchabonnements();

  }
}
