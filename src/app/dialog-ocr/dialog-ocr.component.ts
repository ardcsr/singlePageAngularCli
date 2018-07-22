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
  selectthis(number) {
    this.selectImage = number;
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
      const element = this.dataText.indexOf(this.arrayfillterObject[index].title.toUpperCase());
      console.log(this.arrayfillterObject[index].title);
      console.log(element)
      if (element == -1) {
        const element2 = this.dataText.indexOf(this.arrayfillterObject[index].title.charAt(0).toUpperCase() + this.arrayfillterObject[index].title.slice(1));
        if (element2 == -1) {
          const element3 = this.dataText.indexOf(this.arrayfillterObject[index].title);
          this.arrayfillterObject[index].position = element3;
          this.arrayfillterObject[index].detect = this.arrayfillterObject[index].title;
        } else {
          this.arrayfillterObject[index].position = element2;
          this.arrayfillterObject[index].detect = this.arrayfillterObject[index].title.charAt(0).toUpperCase() + this.arrayfillterObject[index].title.slice(1);
        }
      } else {
        this.arrayfillterObject[index].position = element;
        this.arrayfillterObject[index].detect = this.arrayfillterObject[index].title.toUpperCase();
      }
    }
    this.arrayfillterObject.sort(this.compare);
    console.log(this.arrayfillterObject);
    for (let index = this.arrayfillterObject.length - 1; index > -1; index--) {
      console.log(this.arrayfillterObject[index])
      if (this.arrayfillterObject[index].position == -1) {
        this.arrayfillterObject.splice(index, 1);
      }


    }
    console.log(this.arrayfillterObject);
    for (let index = 0; index < this.arrayfillterObject.length; index++) {
      if (index == 0) {
        console.log(this.arrayfillterObject[index].detect)
        const element = this.dataText.split(this.arrayfillterObject[index].detect);
        this.arrayfillterObject[index].newtext = element[1];
        let name = {
          text: element[0],
          title: 'name'
        }
        this.getTexxt.push(name)
      } else {
        console.log(this.arrayfillterObject[index - 1].newtext)
        const element = this.arrayfillterObject[index - 1].newtext.split(this.arrayfillterObject[index].detect);
        this.arrayfillterObject[index].newtext = element[1];
        let modeltext = {
          text: element[0],
          title: this.arrayfillterObject[index - 1].main
        }
        this.getTexxt.push(modeltext)
        if (index == this.arrayfillterObject.length - 1) {
          let modeltext = {
            text: element[1],
            title: this.arrayfillterObject[index].main
          }
          this.getTexxt.push(modeltext)
        }
      }

    }
    console.log(this.getTexxt)
    this.dialogRef.close(this.getTexxt)
  }
  getTexxt: any = [];
  arrayfillterObject: any = [
    {
      title: 'composition',
      position: '',
      main: 'compostion'
    },
    {
      title: 'product description',
      position: '',
      main: 'productDescription'
    },
    {
      title: 'pharmacological properties',
      position: '',
      main: 'pharmacology'
    },
    {
      title: 'pharmacokinetics',
      position: '',
      main: 'pharmacology'
    },
    {
      title: 'pharmacodgnamics',
      position: '',
      main: 'pharmacology'
    },
    {
      title: 'indications',
      position: '',
      main: 'indications'
    },
    {
      title: 'dosage',
      position: '',
      main: 'dosage'
    },
    {
      title: 'contraindications',
      position: '',
      main: 'contraindications'
    },
    {
      title: 'warnings',
      position: '',
      main: 'warnings'
    },
    {
      title: 'pregnacy and lactation',
      position: '',
      main: 'pregnacy'
    },
    {
      title: 'side Effects',
      position: '',
      main: 'sideEffects'
    },
    {
      title: 'adverse-effects',
      position: '',
      main: 'sideEffects'
    },
    {
      title: 'overdosage',
      position: '',
      main: 'overdosage'
    },
    {
      title: 'storage',
      position: '',
      main: 'storage'
    },
    {
      title: 'packaging',
      position: '',
      main: 'packaging'
    },
    {
      title: 'packing',
      position: '',
      main: 'packaging'
    },
    {
      title: 'note',
      position: '',
      main: 'note'
    },
    {
      title: 'mode of action',
      position: '',
      main: 'actions'
    },
    {
      title: 'medranism of action',
      position: '',
      main: 'actions'
    },
  ]
}
