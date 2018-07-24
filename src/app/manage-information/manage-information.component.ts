import { Component, OnInit } from '@angular/core';
import { PageService } from '../pages/shared/page.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-manage-information',
  templateUrl: './manage-information.component.html',
  styleUrls: ['./manage-information.component.scss']
})

export class ManageInformationComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: PageService, private router: Router) { }
  drugShowInfo: any;
  searcheQuery = '';
  ngOnInit() {
    this.api.listDrug(this.searcheQuery).subscribe(
      res => {
        this.drugShowInfo = res.data;
        console.log(this.drugShowInfo);
        for (let i = 0; i <= this.drugShowInfo.length - 1; i++) {
          this.drugShowInfo[i].indications = this.drugShowInfo[i].indications.substring(0, 100) + '...';
        }

      },
      error => { });
  }
  showDrug(drugId) {
    console.log(drugId);
    this.router.navigate(['/drug'], { queryParams: { drugId } });
  }


  dialogTakephoto3() {
    const dialogRefLoading = this.dialog.open(DialogDeleteComponent);
  }

  searchDrug() {
    this.api.listDrug(this.searcheQuery).subscribe(
      res => {
        console.log(res);
        this.drugShowInfo = res.data;
        for (let i = 0; i <= this.drugShowInfo.length - 1; i++) {
          this.drugShowInfo[i].keywords.properties = this.drugShowInfo[i].keywords.properties.substring(0, 100) + '...';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteDrug(idx: any) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        const drugInfo = {
          _id: this.drugShowInfo[idx]._id,
          _status: 0
        };
        this.api.updateDrug(drugInfo).subscribe(
          res => {
            console.log(res);
            this.searchDrug();
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
