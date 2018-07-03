import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogMachineComponent } from '../dialog-machine/dialog-machine.component';
import { DialogOcrComponent } from '../dialog-ocr/dialog-ocr.component';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../pages/shared/page.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  validationForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private api: PageService, private formBuilder: FormBuilder) { }
  userId: any;
  titleText = 'สร้าง';
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
  onSubmit() {
    console.log(this.validationForm.value);
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
          });

        }
      },
      error => {
        console.log(error);
      }
    );
    this.validationForm.patchValue({});
  }
}
