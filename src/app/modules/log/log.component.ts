import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/service/employe.service';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  dataSource: MatTableDataSource<any> | undefined;
  logEntries: any[] = [];

  constructor(private logService: EmployeService) {}

  ngOnInit() {
    console.log(!!true);
    this.getLogEntries();
  }

  telechrgerexcel(){
    let element = document.getElementById('ex');
    const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,'Tableaux.xlsx');
  }

  getLogEntries() {
    this.logService.getLogEntries().subscribe(
      (data) => {
        this.logEntries = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching log entries:', error);
      }
    );
  }
}
