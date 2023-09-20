import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeService } from 'src/app/service/employe.service';
import { TelephoneService } from 'src/app/service/telephone.service';
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

  alldata!:any;
  saleData: { name: string; value: any }[] = [];
  numberphone!:number;
  ListEmploye: any;
  nombre: any;
  datatosend:any;
  data2015!:any;
  data2016!:any;
  data2017!:any;
  data2018!:any;
  data2019!:any;
  data2020!:any;
  data2021!:any;
  data2022!:any;
  data2023!:any;
  datanewuser:any[] =[];
  dataresignation:any[]=[];
  dataretention:any[]=[];
  listlog!:any;
  sumresignation!:number;
  sumnewuser!:number;
  sumretention!:number;

  constructor(private service: EmployeService,private teleservice:TelephoneService){

  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.all();
    this.teleservice.getcirclechart().subscribe(res=>{
      this.alldata = res

      Object.entries(this.alldata).forEach(([key, value]) => {
        console.log(key, value);
        this.saleData.push({ name: key, value: value });
      });
      console.log(this.saleData);
      //console.log(this.cc);
      // console.log(this.alldata);



    });
  }

  telechargerExcel(){
      let element = document.getElementById('ex');
      const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const wb : XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
      XLSX.writeFile(wb,'Tableaux.xlsx');
  }
  chart(){

  }

  all(): any{
    this.service.getallphonenumber().subscribe(num=>{
      console.log(num);
      this.numberphone = num as number;
    })
    this.service.getUsers().subscribe(data=> {

      this.ListEmploye = data;
      this.dataSource = new MatTableDataSource(this.ListEmploye);
      this.nombre = this.ListEmploye.length;

    });

    this.service.getLogEntries().subscribe(data=>{

      this.listlog = data;
      this.data2015 = this.listlog.filter((user:any) => user?.methode==="delete"&&user?.entity==="user"&&new Date(user?.datetime).getFullYear() === 2015)??0;
      this.data2016 = this.listlog.filter((user:any) => user?.methode==="delete"&&user?.entity==="user"&&new Date(user?.datetime).getFullYear() === 2016)??0;
      this.data2017 = this.listlog.filter((user:any) => user?.methode==="delete"&&user?.entity==="user"&&new Date(user?.datetime).getFullYear() === 2017)??0;
      this.data2018 = this.listlog.filter((user:any) => user?.methode==="delete"&&user?.entity==="user"&&new Date(user?.datetime).getFullYear() === 2018)??0;
      this.data2019 = this.listlog.filter((user:any) => user?.methode==="delete"&&user?.entity==="user"&&new Date(user?.datetime).getFullYear() === 2019)??0;
      this.data2020 = this.listlog.filter((user:any) => user?.methode==="delete"&&user?.entity==="user"&&new Date(user?.datetime).getFullYear() === 2020)??0;
      this.data2021 = this.listlog.filter((user:any) => user?.methode==="delete"&&user?.entity==="user"&&new Date(user?.datetime).getFullYear() === 2021)??0;
      this.data2022 = this.listlog.filter((user:any) => user?.methode==="delete"&&user?.entity==="user"&&new Date(user?.datetime).getFullYear() === 2022)??0;
      this.data2023 = this.listlog.filter((user:any) => user?.methode==="delete"&&user?.entity==="user"&&new Date(user?.datetime).getFullYear() === 2023)??0;

      this.dataresignation.push(this.data2015.length);this.dataresignation.push(this.data2016.length);this.dataresignation.push(this.data2017.length);
      this.dataresignation.push(this.data2018.length);this.dataresignation.push(this.data2019.length);this.dataresignation.push(this.data2020.length);
      this.dataresignation.push(this.data2021.length);this.dataresignation.push(this.data2022.length);this.dataresignation.push(this.data2023.length);
     //console.log("list log :  "+this.listlog.filter((user:any) => user.methode==="delete"&&user.entity==="user"&&new Date(user.datetime).getFullYear() === 2023)??0);
     this.sumresignation = this.dataresignation.reduce((accumulator, currentValue) => accumulator + currentValue, 0);




     this.data2015 = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2015)??0;
     this.data2016 = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2016)??0;
     this.data2017 = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2017)??0;
     this.data2018 = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2018)??0;
     this.data2019 = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2019)??0;
     this.data2020 = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2020)??0;
     this.data2021 = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2021)??0;
     this.data2022 = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2022)??0;
     this.data2023 = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2023)??0;

     this.dataretention.push(this.data2015.length);this.dataretention.push(this.data2016.length);this.dataretention.push(this.data2017.length);
     this.dataretention.push(this.data2018.length);this.dataretention.push(this.data2019.length);this.dataretention.push(this.data2020.length);
     this.dataretention.push(this.data2021.length);this.dataretention.push(this.data2022.length);this.dataretention.push(this.data2023.length);
     var count = this.listlog.filter((user:any) => user?.methode==="put"&&user?.entity==="user"&&user?.messagetele==="changer le tele avec un autre tele"&&new Date(user?.datetime).getFullYear() === 2023)??0
     console.log("list log :  "+count.length);
    this.sumretention = this.dataretention.reduce((accumulator, currentValue) => accumulator + currentValue, 0);





     this.data2015 = this.ListEmploye.filter((user:any) => new Date(user?.datechart).getFullYear() === 2015)??0;
     this.data2016 = this.ListEmploye.filter((user:any) => new Date(user?.datechart).getFullYear() === 2016)??0;
     this.data2017 = this.ListEmploye.filter((user:any) => new Date(user?.datechart).getFullYear() === 2017)??0;
     this.data2018 = this.ListEmploye.filter((user:any) => new Date(user?.datechart).getFullYear() === 2018)??0;
     this.data2019 = this.ListEmploye.filter((user:any) => new Date(user?.datechart).getFullYear() === 2019)??0;
     this.data2020 = this.ListEmploye.filter((user:any) => new Date(user?.datechart).getFullYear() === 2020)??0;
     this.data2021 = this.ListEmploye.filter((user:any) => new Date(user?.datechart).getFullYear() === 2021)??0;
     this.data2022 = this.ListEmploye.filter((user:any) => new Date(user?.datechart).getFullYear() === 2022)??0;
     this.data2023 = this.ListEmploye.filter((user:any) => new Date(user?.datechart).getFullYear() === 2023)??0;


     this.datanewuser.push(this.data2015.length);
     this.datanewuser.push(this.data2016.length);
     this.datanewuser.push(this.data2017.length);
     this.datanewuser.push(this.data2018.length);
     this.datanewuser.push(this.data2019.length);
     this.datanewuser.push(this.data2020.length);
     this.datanewuser.push(this.data2021.length);
     this.datanewuser.push(this.data2022.length);
     this.datanewuser.push(this.data2023.length);
    console.log("=============== "+this.datanewuser);
    this.sumnewuser = this.datanewuser.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log("this is sumnewuser "+this.sumnewuser)

    this.datatosend = [
      {
        name: 'Nouveaux Employés',
        data: this.datanewuser
      },
      {
        name: 'Rétention Employés',
        data: this.dataretention
      },
      {
        name: 'Démission Employés',
        data: this.dataresignation
      }
    ];


    });


  }

  displayedColumns: string[] = ['id', 'nom', 'prenom' , 'matricule','poste','affectation','telephone','acquisition','date_acquisition','abonnement','forfeit','montant_abonnement'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


}
