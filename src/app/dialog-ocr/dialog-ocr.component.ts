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
  selectImage = '0';
  url = 'http://35.240.156.34:38302/api/documentbyocr/upload';
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
            console.log('[1]')
            console.log(this.imageInfo);
            if (this.imageInfo.statusCode === 200) {
              this.imagePath.push(this.imageInfo.data._id);
              this.imagePath.push(this.imageInfo.data2._id);
              console.log('[2]')
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
  selectthis(number){
    this.selectImage=number;
    console.log(number)
  }
  processOcr() {
    this.statusOcr = true;
    // tslint:disable-next-line:max-line-length
    this.api.getOCR(this.imagePath[this.selectImage]).subscribe(res => { console.log(res); this.dataText = res.data2; console.log(this.dataText); }, error => { });
  }
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const genreA = a.position;
    const genreB = b.position;

    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }
  cutText() {
    for (let index = 0; index < this.arrayfillterObject.length; index++) {
      const element = this.dataText.indexOf(this.arrayfillterObject[index].title);
      console.log(this.arrayfillterObject[index].title);
      console.log(element)
      this.arrayfillterObject[index].position = element;



    }
    this.arrayfillterObject.sort(this.compare);
    console.log(this.arrayfillterObject);
    for (let index = 0; index < this.arrayfillterObject.length; index++) {
      if (index == 0) {
        console.log(this.arrayfillterObject[index].title)
        const element = this.dataText.split(this.arrayfillterObject[index].title);
        this.arrayfillterObject[index].newtext = element[1];
        let name = {
          _name: element[0]
        }
        this.getTexxt.push(name)
      } else {
        console.log(this.arrayfillterObject[index - 1].newtext)
        const element = this.arrayfillterObject[index - 1].newtext.split(this.arrayfillterObject[index].title);
        this.arrayfillterObject[index].newtext = element[1];
        let modeltext = {
          text: element[0],
          title: this.arrayfillterObject[index - 1].title
        }
        this.getTexxt.push(modeltext)
        if (index == this.arrayfillterObject.length - 1) {
          let modeltext = {
            text: element[1],
            title: this.arrayfillterObject[index].title
          }
          this.getTexxt.push(modeltext)
        }
      }

    }
    console.log(this.getTexxt)
  }
  getTexxt: any = [];
  arrayfillterObject: any = [
    {
      title: 'DOSAGE',
      position: '2'
    }, {
      title: 'STORAGE',
      position: '3'
    }, {
      title: 'PHARMACOLOGICAL PROPERTIES',
      position: '4'
    }, {
      title: 'COMPOSITION',
      position: '5'
    }, {
      title: 'INDICATIONS',
      position: '1'
    }, {
      title: 'Note',
      position: '9'
    }, {
      title: 'WARNINGS',
      position: '6'
    }, {
      title: 'ADVERSE-EFFECTS',
      position: '7'
    }, {
      title: 'PACKING',
      position: '8'
    }
  ]
}
