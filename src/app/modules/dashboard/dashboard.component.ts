import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeService } from 'src/app/service/employe.service';
import * as XLSX from 'xlsx';


export interface PeriodicElement {
  name: string;
  id: number;
  Direction: string;
  telephone: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  ListEmploye: any;
  nombre: any;

  constructor(private service: EmployeService){

  }

  telechargerExcel(){
      let element = document.getElementById('ex');
      const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const wb : XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
      XLSX.writeFile(wb,'Tableaux.xlsx');
  }

  all(): any{
    this.service.getUsers().subscribe(data=> {
      this.ListEmploye = data;
      this.dataSource = new MatTableDataSource(this.ListEmploye);
      this.nombre = this.ListEmploye.length;
      console.log('list of users', this.ListEmploye);
    });
  }

  displayedColumns: string[] = ['id', 'nom', 'prenom' , 'matricule','poste','affectation','telephone','montant','abonnement','montant_abonnement'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.all());

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngOnInit() {
    this.all();
    this.dataSource.paginator = this.paginator;
  }
}
