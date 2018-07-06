import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageService } from '../pages/shared/page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private api: PageService, private formBuilder: FormBuilder, private router: Router) { }
  userId = '';
  validationForm: FormGroup;
  titleText = 'สร้าง';
  statusEditFail = false;
  statusEditSus = false;
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

  onSubmit() {
    // this.formSubmitted = true;
    let userFrom = this.validationForm.value;
    if (this.userId) {
      const User = { _id: this.userId };
      userFrom = Object.assign(User, userFrom);
      console.log(userFrom);
      this.updateUser(userFrom);
    } else {
      this.createUser(userFrom);
    }

  }
  updateUser(userFrom) {
    this.api.updateUser(userFrom).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      });
  }
  createUser(userFrom) {
    this.api.createUser(userFrom).subscribe(
      (res) => {
        console.log(res);
        if (res.statusCode === 200) {
          this.statusEditFail = false;
          this.statusEditSus = true;
        } else {
          this.statusEditFail = true;
          this.statusEditSus = false;
        }
        // this.router.navigate(['/app/manageuser']);
      },
      (error) => {
        console.log(error);
        this.statusEditFail = true;
        this.statusEditSus = false;
      });
  }

}
