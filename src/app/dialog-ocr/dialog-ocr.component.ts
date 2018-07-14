import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { PageService } from '../pages/shared/page.service';
@Component({
  selector: 'app-dialog-ocr',
  templateUrl: './dialog-ocr.component.html',
  styleUrls: ['./dialog-ocr.component.scss']
})
export class DialogOcrComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogOcrComponent>, private api: PageService) { }
  imageInfo: any;
  imagePath = [];
  statusOcr = false;
  dataText = '';
  url = 'http://35.240.156.34:38302/api/document/upload';
  urlOcr = 'http://35.240.156.34:38302/api/document/test/';
  ngOnInit() {
  }
  change(files) {
    for (let i = 0; i < files.files.length; i++) {
      const formData = new FormData();
      formData.append('file', files.files[i]);
      formData.append('_userId', '01');
      formData.append('_refId', '01');
      formData.append('type', 'image');
      formData.append('_status', '1');
      // tslint:disable-next-line:max-line-length
      Observable.fromPromise(fetch(this.url, { method: 'post', body: formData, headers: { 'Authorization': localStorage.getItem('token') } })).map(res => res.json()).subscribe(
        res => {
          res.then(value => {
            this.imageInfo = value;
            console.log(this.imageInfo);
            if (this.imageInfo.statusCode === 200) {
              this.imagePath.push(this.imageInfo.data._id);
              console.log(this.imagePath);
              // this.imagePath.push(this.imageId)
            }
          });
        },
        error => {
          console.log('false');
        }
      );
    }
  }
  processOcr() {
    this.statusOcr = true;
    // tslint:disable-next-line:max-line-length
    this.api.getOCR(this.imagePath[0]).subscribe(res => { console.log(res); this.dataText = res.data2; console.log(this.dataText); }, error => { });
  }

}
