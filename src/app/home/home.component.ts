import { Component, OnInit } from '@angular/core';
import { PageService } from '../pages/shared/page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  editInput = false;
  constructor(private api: PageService, private router: Router) { }
  statusLogin = true;
  a = '';
  drugs: any;
  drugList: any;
  statusSearch = false;
  selectedShape = 'selectAll';
  selectedColor = 'allColor';
  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.statusLogin = false;
    }
    // this.api.listDrug(this.a).subscribe(res => {
    //   this.drugs = res.data;
    //   console.log(res);
    // });
  }
  onStatusEdit() {
    switch (this.editInput) {
      case true:
        this.editInput = false;
        break;

      default:
        this.editInput = true;
        break;
    }
  }
  logoutforHeader() {
    this.statusLogin = true;
  }
  searchDrug(text) {
    if (text) {
      this.statusSearch = true;
      this.api.searchDrug({ query: text }).subscribe(res => {
        this.drugs = res.data;
        console.log(this.drugs);
        this.filter();
      }, error => { });
    } else {
      this.drugList = [];
    }
    console.log(this.statusSearch);
  }
  filter() {
    console.log(this.selectedColor + '..' + this.selectedShape);
    this.drugList = JSON.parse(JSON.stringify(this.drugs));
    // console.log(this.drugList)
    if (this.selectedColor !== 'allColor') {
      this.drugList = this.drugList.filter((ref) => {
        return (ref.keywords.ColorName.indexOf(this.selectedColor) > -1);
      });
    }
    if (this.selectedShape !== 'selectAll') {
      this.drugList = this.drugList.filter((ref) => {
        return (ref._dimensions.shape.indexOf(this.selectedShape) > -1);
      });
    }
    console.log(this.drugList);
  }
  seeData(drugId) {
    this.router.navigate(['/drug'], { queryParams: { drugId } });
  }
}
