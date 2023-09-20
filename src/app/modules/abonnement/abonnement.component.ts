import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AbonnementService } from 'src/app/service/abonnement.service';
import { AbonnementAddEditComponent } from '../abonnement-add-edit/abonnement-add-edit.component';
import { UpdateabonnementComponent } from '../updateabonnement/updateabonnement.component';
import { Abonnement } from 'src/app/model/abonnement';
import * as XLSX from 'xlsx';

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
  numberinwi2: any;
  constructor(private service:AbonnementService, private _dialog: MatDialog){

  }


  searching(event: any){
    console.log(event)
    var item = this.ListAll.filter( item =>
        item.nom.toLowerCase().includes(event.toLowerCase()) ||
        item.montant.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.forfeit.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.remise.toString().toLowerCase().includes(event.toLowerCase())
    )
    this.dataSource = new MatTableDataSource(item);
  }
  telechrgerexcel(){
    let element = document.getElementById('ex');
    const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,'TableauAbonnements.xlsx');
  }

  fetchabonnements(){
      this.service.getAbonnement().subscribe(data => {
      this.Abonnements = data;
      this.ListAll = data;
      console.log(this.ListAll);
      this.Abonnements.forEach((res: any) => {
          if(res['nom']=='Inwi' && res['forfeit']=='ILLIM&25GO'){
            res['naffectation'] = this.numberinwi;
          }
          else if(res['nom']=='Inwi' && res['forfeit']=='30H&30G'){
            res['naffectation'] = this.numberinwi1;
          }
          else if(res['nom']=='Inwi' && res['forfeit']=='ILLIMITE NATIONAL&INTERNATIONAL & DATA'){
            res['naffectation'] = this.numberinwi1;
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
    const check = window.confirm("est ce que vous etes sur de supprimer l'abonnement !!!");
    if(check){
    this.service.deleteabonnement(id).subscribe({
      next: (res) => {
        console.log("Supprimé")
        alert('Abonnement Supprimée!!');
        this.fetchabonnements();
      },
      error: console.log,
    });}
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


  displayedColumns: string[] = ["id","name","forfeit","montant","remise","naffectation","action"];


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.service.getUsers().subscribe(data =>{

      const inwi = data.filter((obj: any) => obj.abonnement?.nom === 'Inwi'  && obj.abonnement?.forfeit === 'ILLIM&25GO');
      this.numberinwi = inwi.length;
      const inwi1 = data.filter((obj: any) => obj.abonnement?.nom === 'Inwi'  && obj.abonnement?.forfeit === '30H&30G');
      this.numberinwi1 = inwi1.length;
      const inwi2 = data.filter((obj: any) => obj.abonnement?.nom === 'Inwi'  && obj.abonnement?.forfeit === 'ILLIMITE NATIONAL&INTERNATIONAL & DATA');
      this.numberinwi2 = inwi2.length;
    });
    this.fetchabonnements();

  }
}
