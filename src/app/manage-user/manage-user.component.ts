import { Component, OnInit } from '@angular/core';
import { PageService } from '../pages/shared/page.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  constructor(private api: PageService) { }
  nameUser = ""
  userShowInfo: any;
  ngOnInit() {
    this.api.listUser(this.nameUser).subscribe(
      res => {
      this.userShowInfo = res.data;
        console.log(this.userShowInfo)
      },
      error => { })
  }

}
