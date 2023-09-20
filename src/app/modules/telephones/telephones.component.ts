import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Telephone } from 'src/app/model/telephone';
import { TelephoneService } from 'src/app/service/telephone.service';
import { TeleAddEditComponent } from '../tele-add-edit/tele-add-edit.component';
import { UpdatephoneComponent } from '../updatephone/updatephone.component';
import * as XLSX from 'xlsx';
import { isNgTemplate } from '@angular/compiler';

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
  dataSource = new MatTableDataSource(this.ListAll);


  searching(event: any){
    var item = this.ListAll.filter( item =>
        item.marque?.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.model?.toLowerCase().includes(event.toLowerCase()) ||
        item.numero_serie?.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.numero_facture?.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.etat?.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.name?.toString().toLowerCase().includes(event.toLowerCase()) ||
        (item.acquisition?.toString().toLowerCase().includes(event.toLowerCase())) ||
        item.date_acquisition?.toString().toLowerCase().includes(event.toLowerCase())
    )

    this.dataSource = new MatTableDataSource(item);
  }

  fetchphones(){
    return this.service.getphones().subscribe(data => {
        this.ListTelephones = data;
        this.dataSource = new MatTableDataSource(this.ListTelephones)
        this.nombre = this.ListTelephones.length
        console.log('list of Telephones', this.ListTelephones)
    })
  }

  fetchallphones(){
        this.service.getall().subscribe(data => {
        this.ListAll = data;
        this.dataSource = new MatTableDataSource(this.ListAll)
        this.nombre = this.ListAll.length
        console.log('list of Telephones', this.ListAll)
    })
  }

  telechrgerexcel(){
    let element = document.getElementById('ex');
    const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,'Tableaux.xlsx');
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
    const check = window.confirm("est ce que vous etes sur de supprimer ce telephone");
    if(check){
    this.service.deleteTele(id).subscribe({
      next: (res) => {
        alert('Telephone supprimé!');
        this.fetchallphones();
      },
      error: console.log,
    });}
  }


  displayedColumns: string[] = ['id', 'name', 'Marque', 'numero_serie','model', 'etat','numero_facture','acquisition','date_acquisition',"action"];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.ListAll);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchallphones();
  }
}
