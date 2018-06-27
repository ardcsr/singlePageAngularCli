import { Component, OnInit } from '@angular/core';
import { PageService } from '../pages/shared/page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-information',
  templateUrl: './manage-information.component.html',
  styleUrls: ['./manage-information.component.scss']
})
export class ManageInformationComponent implements OnInit {

  constructor(private api: PageService,private router: Router) { }
  nameDrug = ""
  drugShowInfo: any;
  ngOnInit() {
    this.api.listDrug(this.nameDrug).subscribe(
      res => {
        this.drugShowInfo = res.data;
        console.log(this.drugShowInfo)
        for(let i=0;i<=this.drugShowInfo.length-1;i++){
          this.drugShowInfo[i].keywords.properties=this.drugShowInfo[i].keywords.properties.substring(0, 100)+"...";
        }
        
      },
      error => { })
  }
  showDrug(drugId){
    console.log(drugId)
    this.router.navigate(["/drug"], { queryParams: { drugId } });
  }

}
