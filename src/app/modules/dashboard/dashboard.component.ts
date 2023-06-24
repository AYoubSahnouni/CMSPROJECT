import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  ELEMENT_DATA: PeriodicElement[] = [
    {id: 1, name: 'Ayoub Sahnouni', Direction: 'IT', telephone: 'S21'},
    {id: 2, name: 'Amine Mohammed', Direction: 'Comptabilité', telephone: 'M51'},
    {id: 3, name: 'Hicham Labrok', Direction: 'IT', telephone: 'M51'},
    {id: 4, name: 'Ali Bejjaji', Direction: 'Marketing', telephone: 'M51'},
    {id: 5, name: 'Safae Sourouri', Direction: 'RH', telephone: 'A13'},
    {id: 6, name: 'Khalid Hachouch', Direction: 'Finance', telephone: 'S21'},
    {id: 7, name: 'Hiba Benaissa', Direction: 'RH', telephone: 'M51'},
    {id: 8, name: 'Karim Moutawafik', Direction: 'Comptabilité', telephone: 'A13'},
    {id: 9, name: 'Ayoub Tijani', Direction: 'Finance', telephone: 'A13'},
    {id: 10, name: 'Salah Zafati', Direction: 'Marketing', telephone: 'M51'},
    {id: 11, name: 'Ibrahim Bourazgi', Direction: 'IT', telephone: 'S21'},
    {id: 12, name: 'Nacer lachhab', Direction: 'IT', telephone: 'S21'},
    {id: 13, name: 'Mouad Chahid', Direction: 'Comptabilité', telephone: 'A13'}
  ];

  displayedColumns: string[] = ['id', 'name', 'Direction', 'telephone'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
