
import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { EmployeService } from 'src/app/service/employe.service';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent {

  constructor(private service: EmployeService, private dialog: MatDialog) { }

  searching(event: any){
    console.log(event)
    var item = this.ListEmploye.filter( item =>
        item.number.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.telephone?.marque.toString().toLowerCase().includes(event.toLowerCase()) ||
        item.nom.toLowerCase().includes(event.toLowerCase()) ||
        item.prenom.toLowerCase().includes(event.toLowerCase()) ||
        item.poste.toLowerCase().includes(event.toLowerCase()) ||
        item.siege.toLowerCase().includes(event.toLowerCase()) ||
        item.matricule.toLowerCase().includes(event.toLowerCase())
    )
    this.dataSource = new MatTableDataSource(item);
  }

  search: string = "";
  ListEmploye!: User[];
  ListEmployewithTelephone!: User[];
  ListEmployewithoutTelephone!: User[];
  dataSource!: MatTableDataSource<User>;
  nombre: any;

  afficherAffectation: boolean = true;

  boutonsAffiches: boolean = true;

  displayedColumns: string[] = ["id", "matricule", "nom", "prenom", "poste", "siege", "telephone", "number", "action"];

  afficherAvecAffectation() {
    this.afficherAffectation = true;
    this.fetchEmploye();
  }

  afficherSansAffectation() {
    this.afficherAffectation = false;
    this.fetchEmploye();
  }

  deleteEmployee(id: number) {
    console.log(id);
    this.service.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Employee deleted!');
        this.all();
      },
      error: console.log,
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(EmpAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.all();
        }
      },
    });
  }

  openEditForm(emp: any) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: { employee : emp }
    });
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.all();
        }
      },
    });
  }

  all(){
    this.service.getUsers().subscribe(data=> {
      this.ListEmploye = data;
      this.dataSource = new MatTableDataSource(this.ListEmploye);
      this.nombre = this.ListEmploye.length;
      console.log('list of users', this.ListEmploye);
    });
  }


  fetchEmploye() {
    if (this.afficherAffectation) {
      this.service.getEmployewithTelephone().subscribe(data => {
        this.ListEmployewithTelephone = data;
        this.dataSource = new MatTableDataSource(this.ListEmployewithTelephone);
        this.nombre = this.ListEmployewithTelephone.length;
        console.log('list of users', this.ListEmployewithTelephone);
      });
    } else {
      this.service.getEmployewithoutTelephone().subscribe(data => {
        this.ListEmployewithoutTelephone = data;
        this.dataSource = new MatTableDataSource(this.ListEmployewithoutTelephone);
        this.nombre = this.ListEmployewithoutTelephone.length;
        console.log('list of users', this.ListEmployewithoutTelephone);
      });
    }
  }

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User>();
    this.dataSource.paginator = this.paginator;
    this.all();
  }

}
