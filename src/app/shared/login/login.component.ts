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
  constructor(private api: PageService, private formBuilder: FormBuilder) { }
  hide = true;

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.signInGroup = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required]),
    })
  }
  signIn() {
    this.api.signIn(this.signInGroup.value).subscribe(
      res => {
        if (res.statusCode == 200) {
          this.api.createToken(res.data);
          var userInfo = JSON.parse(decodeURIComponent(atob(res.data.split('.')[1])));
          localStorage.setItem('userInfo', userInfo)
          // this.router.navigate(["/edit"])
        }
      },
      error => {
        console.log(error)
      }
    )
  }

}
