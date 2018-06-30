import { Component, OnInit } from '@angular/core';
import { PageService } from '../pages/shared/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  editInput = false;
  constructor(private api: PageService) { }
  statusLogin = true;
  a = '';
  drugs: any;
  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.statusLogin = false;
    }
    this.api.listDrug(this.a).subscribe(res => {
      this.drugs = res.data;
      console.log(res);
    });
  }
  onStatusEdit() {
    switch (this.editInput) {
      case true:
        this.editInput = false;
        break;

      default:
        this.editInput = true;
        break;
    }
  }
  logoutforHeader() {
    this.statusLogin = true;
  }

}
