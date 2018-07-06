import { Component, OnInit } from '@angular/core';
import { PageService } from '../pages/shared/page.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: PageService, private router: Router) { }
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
  searchUser() {
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
  deleteUser(idx: any) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    // dialogRef.componentInstance.title = "ข้อมูลยา";
    // dialogRef.componentInstance.message = "ต้องการลบใช่หรือไม่"
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const drugInfo = {
          _id: this.userShowInfo[idx]._id,
          _status: 0
        };
        this.api.updateUser(drugInfo).subscribe(
          res => {
            console.log(res);
            this.searchUser();
          },
          error => {
            console.log(error);
          }
        );
        // ตกลง
      } else {
        // ไม่ตกลง
      }
    });
  }

}
