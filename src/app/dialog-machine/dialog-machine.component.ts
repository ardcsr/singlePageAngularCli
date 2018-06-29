import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-dialog-machine',
  templateUrl: './dialog-machine.component.html',
  styleUrls: ['./dialog-machine.component.scss']
})
export class DialogMachineComponent implements OnInit {
  public msg = '';
  public logImage: any;
  public member = '';
  constructor(public dialogRef: MatDialogRef<DialogMachineComponent>) { }

  ngOnInit() {
  }

}
