import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogMachineComponent } from '../dialog-machine/dialog-machine.component';
import { DialogOcrComponent } from '../dialog-ocr/dialog-ocr.component';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../pages/shared/page.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private api: PageService) { }
  userId: any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId = params['drugId'];
      console.log(this.userId)
      if (this.userId) {
        this.api.showDrug(this.userId).subscribe(res => {
          console.log(res)
        }, error => {
          console.log(error)
        })
      }

    }
    )
  }

  dialogTakephoto() {
    const dialogRefLoading = this.dialog.open(DialogMachineComponent, { disableClose: false });
  }
  dialogTakephoto2() {
    const dialogRefLoading = this.dialog.open(DialogOcrComponent, { disableClose: false });
  }
}
