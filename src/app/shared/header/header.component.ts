import { Component, OnInit } from '@angular/core';
import { PageService } from '../../pages/shared/page.service';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private api: PageService,private homer:HomeComponent) { }
  userId=""
  ngOnInit() {

    this.userId=localStorage.getItem('token');
    console.log(this.userId)
  }
  signOut(){
    localStorage.removeItem('token')
    this.userId=null
    this.homer.logoutforHeader();
  }
//{ path: 'user', component: UserComponent },
// { path: 'manageUser', component: ManageUserComponent },
// { path: 'manageInformation', component: ManageInformationComponent },
// { path: 'information', component: InformationComponent },
// { path: 'login', component: LoginComponent },
}
