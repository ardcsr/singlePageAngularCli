import { Component, OnInit } from '@angular/core';
import {Headers, RequestOptions,Http} from '@angular/http';
import { PageService } from '../../pages/shared/page.service';
// import {MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [PageService]
})
export class DashboardComponent implements OnInit {

  constructor(public api: PageService) { }
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  data = [];
  dataSource
  ngOnInit() {
    let a =""
    this.api.listDrug(a).subscribe(
      res =>{
        this.data=res.data;
        console.log(this.data)
        this.dataSource=res.data
      }
    )
  }


}
