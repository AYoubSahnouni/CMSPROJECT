import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AbonnementService } from 'src/app/service/abonnement.service';
import { AbonnementAddEditComponent } from '../abonnement-add-edit/abonnement-add-edit.component';


@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent {

  Abonnements!: any[];
  nombre!: number;
  dataSource: any;
  matricule!: any[];
  constructor(private service:AbonnementService, private _dialog: MatDialog){

  }

  fetchabonnements(){
    return this.service.getAbonnement().subscribe(data => {
      this.Abonnements = data;
      this.dataSource = new MatTableDataSource(this.Abonnements)
      console.log('list of users', this.Abonnements)
  })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AbonnementAddEditComponent, {
      data,
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

  displayedColumns: string[] = ["id","name","montant","remise","nom","matricule","action"];


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchabonnements();

  }
}
