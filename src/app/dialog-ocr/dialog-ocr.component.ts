import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-dialog-ocr',
  templateUrl: './dialog-ocr.component.html',
  styleUrls: ['./dialog-ocr.component.scss']
})
export class DialogOcrComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogOcrComponent>) { }

  ngOnInit() {
  }

}
