import { Component, OnInit } from '@angular/core';
import { PageService } from '../../pages/shared/page.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInGroup: FormGroup; 
  constructor(private api: PageService,private formBuilder: FormBuilder) { }

  ngOnInit() {
  this.buildForm();
  }
  buildForm() {
    this.signInGroup = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required]),
    })
  }

}
