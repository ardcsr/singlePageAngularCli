import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogMachineComponent } from '../dialog-machine/dialog-machine.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  ngOnInit() {
  }
  dialogTakephoto(){
    const dialogRefLoading = this.dialog.open(DialogMachineComponent, { disableClose: true });
  }
}
