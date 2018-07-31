import { Component, OnInit } from '@angular/core';
import { PageService } from '../../pages/shared/page.service';
import { Router } from '@angular/router';
// import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private api: PageService, private router: Router) { }
  userId = '';
  userInfo = '';
  ngOnInit() {
    this.userInfo = this.api.getUserInfo();
    this.userId = localStorage.getItem('token');
    // console.log(this.userId);
    setInterval(() => {
      this.userInfo = this.api.getUserInfo();
      this.userId = localStorage.getItem('token');
    }, 500)
  }
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    this.userId = null;
    this.router.navigate(['']);
    // this.homer.logoutforHeader();
  }
  // { path: 'user', component: UserComponent },
  // { path: 'manageUser', component: ManageUserComponent },
  // { path: 'manageInformation', component: ManageInformationComponent },
  // { path: 'information', component: InformationComponent },
  // { path: 'login', component: LoginComponent },
}
