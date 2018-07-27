import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogMachineComponent } from '../dialog-machine/dialog-machine.component';
import { DialogOcrComponent } from '../dialog-ocr/dialog-ocr.component';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../pages/shared/page.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  validationForm: FormGroup;
  drugModel: any;
  // tslint:disable-next-line:max-line-length
  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private api: PageService, private formBuilder: FormBuilder) { }
  userId: any;
  titleText = 'สร้าง';
  statusFail = false;
  statusSus = false;
  imageInfo: any;
  imagePath: any;
  url = 'http://dev.baeslab.com:38302/api/document/upload';
  ngOnInit() {
    this.buildForm();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId = params['drugId'];
      console.log(this.userId);
      if (this.userId) {
        this.titleText = 'แก้ไข';
        this.showInfo(this.userId);
      }
    });

  }

  dialogTakephoto() {
    const dialogRefLoading = this.dialog.open(DialogMachineComponent, { disableClose: false });
  }
  dialogTakephoto2() {
    const dialogRefLoading = this.dialog.open(DialogOcrComponent, { disableClose: false });
    dialogRefLoading.afterClosed().subscribe((result) => {
      console.log(result)
      for (let index = 0; index < result.length; index++) {
        switch (result[index].title.toLowerCase()) {
          case 'compostion':
          this.validationForm.patchValue({ compostion: result[index].text })
            break;
          case 'productDescription':
          this.validationForm.patchValue({ productDescription: result[index].text })
            break;
          case 'pharmacology':
          this.validationForm.patchValue({ pharmacology: result[index].text })
            break;
          case 'indications':
          this.validationForm.patchValue({ indications: result[index].text })
            break;
          case 'dosage':
          this.validationForm.patchValue({ dosage: result[index].text })
            break;
          case 'contraindications':
          this.validationForm.patchValue({ contraindications: result[index].text })
            break;
          case 'warnings':
          this.validationForm.patchValue({ warnings: result[index].text })
            break;
          case 'pregnacy':
          this.validationForm.patchValue({ pregnacy: result[index].text })
            break;
          case 'sideEffects':
          this.validationForm.patchValue({ sideEffects: result[index].text })
            break;
          case 'overdosage':
          this.validationForm.patchValue({ overdosage: result[index].text })
            break;
          case 'storage':
          this.validationForm.patchValue({ storage: result[index].text })
            break;
          case 'packaging':
          this.validationForm.patchValue({ packaging: result[index].text })
            break;
          case 'note':
          this.validationForm.patchValue({ note: result[index].text })
            break;
          case 'actions':
          this.validationForm.patchValue({ actions: result[index].text })
            break;
          case 'name':
          this.validationForm.patchValue({ _name: result[index].text })
            break;
        }
      }
      
    })
  }

  buildForm() {
    this.validationForm = this.formBuilder.group({
      _name: this.formBuilder.control(null, [Validators.required]),
      _brandName: this.formBuilder.control(null, [Validators.required]),
      description: this.formBuilder.control(null),
      properties: this.formBuilder.control(null, [Validators.required]),
      shape: this.formBuilder.control(null, [Validators.required]),
      area: this.formBuilder.control(null, [Validators.required]),
      colorName: this.formBuilder.control(null, [Validators.required]),
      radius: this.formBuilder.control(null, [Validators.required]),
      circularity: this.formBuilder.control(null, [Validators.required]),
      R: this.formBuilder.control(null, [Validators.required]),
      G: this.formBuilder.control(null, [Validators.required]),
      B: this.formBuilder.control(null, [Validators.required]),
      H: this.formBuilder.control(null, [Validators.required]),
      S: this.formBuilder.control(null, [Validators.required]),
      V: this.formBuilder.control(null, [Validators.required]),
      compostion: this.formBuilder.control(null, [Validators.required]),
      productDescription: this.formBuilder.control(null, [Validators.required]),
      pharmacology: this.formBuilder.control(null, [Validators.required]),
      indications: this.formBuilder.control(null, [Validators.required]),
      dosage: this.formBuilder.control(null, [Validators.required]),
      contraindications: this.formBuilder.control(null, [Validators.required]),
      warninge: this.formBuilder.control(null, [Validators.required]),
      interactions: this.formBuilder.control(null, [Validators.required]),
      pregnacy: this.formBuilder.control(null, [Validators.required]),
      sideEffects: this.formBuilder.control(null, [Validators.required]),
      overdosage: this.formBuilder.control(null, [Validators.required]),
      storage: this.formBuilder.control(null, [Validators.required]),
      revesedDate: this.formBuilder.control(null, [Validators.required]),
      packaging: this.formBuilder.control(null, [Validators.required]),
      note: this.formBuilder.control(null, [Validators.required]),
      actions: this.formBuilder.control(null, [Validators.required]),
      // requiredPattern: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/)]),
    });

  }

  showInfo(ID) {
    this.api.showDrug(ID).subscribe(
      res => {
        console.log(res);
        // this.drugfrom = res.data;
        if (res.statusCode === 200) {
          this.validationForm.patchValue({
            _name: res.data._name,
            _brandName: res.data._brandName,
            description: res.data.description,
            shape: res.data._dimensions.shape,
            area: res.data._dimensions.area,
            colorName: res.data.keywords.ColorName,
            radius: res.data._dimensions.radius,
            R: res.data._RGBProfile.red,
            G: res.data._RGBProfile.green,
            B: res.data._RGBProfile.blue,
            H: res.data._HSVProfile.hue,
            S: res.data._HSVProfile.saturation,
            V: res.data._HSVProfile.value,
            circularity: res.data._dimensions.circularity,
            properties: res.data.keywords.properties,
            compostion: res.data.compostion,
            productDescription: res.data.productDescription,
            pharmacology: res.data.pharmacology,
            indications: res.data.indications,
            dosage: res.data.dosage,
            contraindications: res.data.contraindications,
            warninge: res.data.warninge,
            interactions: res.data.interactions,
            pregnacy: res.data.pregnacy,
            sideEffects: res.data.sideEffects,
            overdosage: res.data.overdosage,
            storage: res.data.storage,
            revesedDate: res.data.revesedDate,
            packaging: res.data.packaging,
            note: res.data.note,
            actions: res.data.actions,
          });

        }
      },
      error => {
        console.log(error);
      }
    );
    this.validationForm.patchValue({});
  }

  onSubmit() {

    let splitedColorName;
    if (typeof this.validationForm.value.colorName === 'string') {
      splitedColorName = this.validationForm.value.colorName.split('-');
    } else {
      splitedColorName = this.validationForm.value.colorName;
    }
    let splitedPropoties;
    if (typeof this.validationForm.value.properties === 'string') {
      splitedPropoties = this.validationForm.value.properties.split(',');
    } else {
      splitedPropoties = this.validationForm.value.properties;
    }



    console.log('splitedColorName : ', splitedColorName);
    console.log('splitedPropoties : ', splitedPropoties);
    // this.formSubmitted = true;
    this.drugModel = {
      _name: this.validationForm.value._name,
      _brandName: 'brandName',
      _RGBProfile: {
        red: this.validationForm.value.R,
        green: this.validationForm.value.G,
        blue: this.validationForm.value.B
      },
      _HSVProfile: {
        hue: this.validationForm.value.H,
        saturation: this.validationForm.value.S,
        value: this.validationForm.value.V

      },
      _dimensions: {
        area: this.validationForm.value.area,
        radius: this.validationForm.value.radius,
        circularity: this.validationForm.value.circularity,
        shape: this.validationForm.value.shape
      },
      description: this.validationForm.value.description,
      keywords: {
        ColorName: splitedColorName,
        properties: splitedPropoties
      },
      _status: 1,
      imageId: [],
      compostion: this.validationForm.value.compostion,
      productDescription: this.validationForm.value.productDescription,
      pharmacology: this.validationForm.value.pharmacology,
      indications: this.validationForm.value.indications,
      dosage: this.validationForm.value.dosage,
      contraindications: this.validationForm.value.contraindications,
      warninge: this.validationForm.value.warninge,
      interactions: this.validationForm.value.interactions,
      pregnacy: this.validationForm.value.pregnacy,
      sideEffects: this.validationForm.value.sideEffects,
      overdosage: this.validationForm.value.overdosage,
      storage: this.validationForm.value.storage,
      revesedDate: this.validationForm.value.revesedDate,
      packaging: this.validationForm.value.packaging,
      note: this.validationForm.value.note,
      actions: this.validationForm.value.actions,

    };
    console.log(this.drugModel);
    if (this.userId === true) {
      const User = { _id: this.userId };
      this.drugModel = Object.assign(User, this.drugModel);
      console.log(this.drugModel);
      this.api.updateDrug(this.drugModel).subscribe(
        res => {
          console.log(res);
          if (res.statusCode === 200) {
            this.statusFail = false;
            this.statusSus = true;
          } else {
            this.statusFail = true;
            this.statusSus = false;
          }

        },
        error => {
          console.log(error);
          this.statusFail = true;
          this.statusSus = false;
        }
      );
      // update
    } else {
      this.api.createDrug(this.drugModel).subscribe(
        res => {
          console.log(res);
          if (res.statusCode === 200) {
            this.statusFail = false;
            this.statusSus = true;
          } else {
            this.statusFail = true;
            this.statusSus = false;
          }
        },
        error => {
          console.log(error);
          this.statusFail = true;
          this.statusSus = false;
        }
      );
    }
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
}
