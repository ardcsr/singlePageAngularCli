import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { PageService } from '../pages/shared/page.service';
@Component({
  selector: 'app-dialog-topic',
  templateUrl: './dialog-topic.component.html',
  styleUrls: ['./dialog-topic.component.scss']
})
export class DialogTopicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
