import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  editInput=false;
  constructor() { }
  statusLogin=true
  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      this.statusLogin=false
    }
  }
  onStatusEdit(){
    switch (this.editInput) {
      case true:
        this.editInput=false;
        break;
    
      default:
      this.editInput=true;
        break;
    }
  }
  logoutforHeader(){
    this.statusLogin=true 
  }

}
