import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Telephone } from 'src/app/model/telephone';
import { TelephoneService } from 'src/app/service/telephone.service';
import { TeleAddEditComponent } from '../tele-add-edit/tele-add-edit.component';
import { UpdatephoneComponent } from '../updatephone/updatephone.component';

@Component({
  selector: 'app-telephones',
  templateUrl: './telephones.component.html',
  styleUrls: ['./telephones.component.scss']
})
export class TelephonesComponent {

  constructor(private service: TelephoneService,private _dialog: MatDialog) {}

  ListTelephones!: any[];
  ListAll!: Telephone[];
  nombre!: number;
  dataSource: any;


  searching(event: any){
    console.log(event)
    var item = this.ListAll.filter( item =>
        item.marque.toLowerCase().includes(event.toLowerCase()) ||
        item.model.toLowerCase().includes(event.toLowerCase()) ||
        item.numero_serie.toLowerCase().includes(event.toLowerCase()) ||
        item.numero_facture.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.etat.toLowerCase().includes(event.toLowerCase()) ||
        item.montant.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.name.toLowerCase().includes(event.toLowerCase())
    )
    this.dataSource = new MatTableDataSource(item);
  }

  fetchphones(){
    return this.service.getphones().subscribe(data => {
        this.ListTelephones = data;
        this.dataSource = new MatTableDataSource(this.ListTelephones)
        this.nombre = this.ListTelephones.length
        console.log('list of users', this.ListTelephones)
    })
  }

  fetchallphones(){
        this.service.getall().subscribe(data => {
        this.ListAll = data;
        this.dataSource = new MatTableDataSource(this.ListAll)
        this.nombre = this.ListAll.length
        console.log('list of users', this.ListAll)
    })
  }

  openForm() {
    const dialogRef = this._dialog.open(TeleAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.fetchallphones();
        }
      },
    });
  }

  openEditForm(tele: any) {
    const dialogRef = this._dialog.open(UpdatephoneComponent, {
      data: {telephone : tele}
    });

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.fetchallphones();
        }
      },
    });
  }
  deleteTele(id: number){
    console.log(id);
    this.service.deleteTele(id).subscribe({
      next: (res) => {
        alert('Employee deleted!');
        this.fetchallphones();
      },
      error: console.log,
    });
  }


  displayedColumns: string[] = ['id', 'name', 'Marque', 'numero_serie','model', 'etat', 'montant','numero_facture','date_acquisition',"action"];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  ngOnInit(): void {
    this.fetchallphones();

  }
}
