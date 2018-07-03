import { Component, OnInit } from '@angular/core';
import { PageService } from '../pages/shared/page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  constructor(private api: PageService, private router: Router) { }
  nameUser = '';
  userShowInfo: any;
  searcheQuery = '';
  ngOnInit() {
    this.api.listUser(this.nameUser).subscribe(
      res => {
        this.userShowInfo = res.data;
        console.log(this.userShowInfo);
      },
      error => { });
  }
  showUser(userId: any) {
    this.router.navigate(['/user'], { queryParams: { userId } });
  }
  searchDrug() {
    this.api.listUser(this.searcheQuery).subscribe(
      res => {
        console.log(res);
        this.userShowInfo = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
