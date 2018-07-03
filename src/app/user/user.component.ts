import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PageService } from '../pages/shared/page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private api: PageService, private formBuilder: FormBuilder) { }
  userId = '';
  validationForm: FormGroup;
  titleText = 'สร้าง';
  ngOnInit() {
    this.buildForm();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId = params['userId'];
      console.log(this.userId);
      if (this.userId) {
        this.titleText = 'แก้ไข';
        this.showInfo(this.userId);
      }
    });
  }

  buildForm() {
    this.validationForm = this.formBuilder.group({
      _username: this.formBuilder.control(null, [Validators.required]),
      _password: this.formBuilder.control(null, [Validators.required]),
      _firstname: this.formBuilder.control(null, [Validators.required]),
      _lastname: this.formBuilder.control(null, [Validators.required]),
      _role: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null),
      telnum: this.formBuilder.control(null),
      _status: 1
    });
  }

  showInfo(ID) {
    this.api.showUser(ID).subscribe(
      res => {
        console.log(res);
        // this.drugfrom = res.data;
        this.validationForm.patchValue({
          _username: res.data._username,
          _password: res.data._password,
          _firstname: res.data._firstname,
          _lastname: res.data._lastname,
          _role: res.data._role,
          email: res.data.email,
          telnum: res.data.telnum,
        });
      },
      error => {
      }
    );
    this.validationForm.patchValue({});
  }

}
