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
    // this.cutText()
    // this.api.listDrug(this.a).subscribe(res => {
    //   this.drugs = res.data;
    //   console.log(res);
    // });
    
    setInterval(() => {
      if (localStorage.getItem('token')) {
        this.statusLogin = false;
        console.log(this.statusLogin)
      }else{
        this.statusLogin = true;
        console.log(this.statusLogin)
      }
    }, 500)
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
  cutText() {
    for (let index = 0; index < this.arrayfillterObject.length; index++) {
      const element = this.dataforCut.indexOf(this.arrayfillterObject[index].title);
      console.log(this.arrayfillterObject[index].title);
      console.log(element)
      this.arrayfillterObject[index].position = element;



    }
    this.arrayfillterObject.sort(this.compare);
    console.log(this.arrayfillterObject);
    for (let index = 0; index < this.arrayfillterObject.length; index++) {
      if(index==0){
        console.log(this.arrayfillterObject[index].title)
        const element = this.dataforCut.split(this.arrayfillterObject[index].title);
        this.arrayfillterObject[index].newtext=element[1];
        this.getTexxt.push(element[0])
      }else{
        console.log(this.arrayfillterObject[index-1].newtext)
        const element = this.arrayfillterObject[index-1].newtext.split(this.arrayfillterObject[index].title);
        this.arrayfillterObject[index].newtext=element[1];
        this.getTexxt.push(element[0])
        if(index==this.arrayfillterObject.length-1){
          this.getTexxt.push(element[1])
        }
      }
      
    }
    console.log(this.getTexxt)
  }
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const genreA = a.position;
    const genreB = b.position;

    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }
  getTexxt:any=[];
  arrayfillter: any = ["DOSAGE", "STORAGE", "PHARMACOLOGICAL PROPERTIES", "COMPOSITION", "INDICATIONS", "Note", "WARNINGS", "ADVERSEEFFECTS", "PACKING"];
  arrayfillterObject: any = [
    {
      title: 'DOSAGE',
      position: '2'
    }, {
      title: 'STORAGE',
      position: '3'
    }, {
      title: 'PHARMACOLOGICAL PROPERTIES',
      position: '4'
    }, {
      title: 'COMPOSITION',
      position: '5'
    }, {
      title: 'INDICATIONS',
      position: '1'
    }, {
      title: 'Note',
      position: '9'
    }, {
      title: 'WARNINGS',
      position: '6'
    }, {
      title: 'ADVERSEEFFECTS',
      position: '7'
    }, {
      title: 'PACKING',
      position: '8'
    }
  ]
  dataforCut: any = `GPO DICLOX Capsules
  (Dicloxacillin Capsules)
  COMPOSITION :
  Each capsule contains : Dicloxacillin Sodium equivalent to Dicloxacillin 2s0 and soo mg
  PHARMACOLOGICAL PROPERTIES :
  Dicloxacillin is a semisynthetic penicillinase-resistant penicillin.The drug is active against
  most gram-positive cocci including beta-hemolytic streptococci,
  pneumococci and staphylococci especially penicillinase-producing strains of Staphylococcus
  aureus and S. epidermidis that are resistant to other penicillins.
  Dicloxacillin is resistant to inactivation by gastric secretions and is rapidly but incompletely
  absorbed from the Gl tract. Food generally decreases the rate and
  extent ofabsorption. Dicloxacillin is distributed into bone, bile, pleural _uid, and synovial _uid.
  The drug can cross the placenta and is distributed into milk.
  Approx. 9S-99% ofthe drug is bound to plasma proteins.The serum half-life in adults is 0.6-0.8 hour
  and in children 2-16 years ofage is 1.9 hours.The half-life
  is slightly prolonged in patients with impaired renal function.
  Dicloxacillin is partially metabolized to active and inactive metabolites. 31-6S% of the dose is excreted
  in urine as unchanged drug and active metabolites
  within 6-8 hours, approx. 10-20% ofthis is the active metabolites.
  INDICATIONS :
  Treatment ofinfections caused by susceptible microorganisms particularly penicillinase-producing
  strains, e.g., mild to moderate respiratory tract infections, s
  kin and soft tissue infections.
  DOSAGE :
  The dosage should be taken at least 1 hour before meals or 2 hours after meals.
  Adults and Children over4O kg of body weight- Oral, 12s-2s0 mg every six hours.
  lnfants and Children up to 40 kg of body weight - Oral, 3.12s-6.2s mg/kg every six hours.
  Note:
  Higher dosage may be necessary depending on the severity of the infections.
  For most staphylococcal infections, therapy should be continued for at least 14 days.
  For group A beta-hemolytic streptococcal infections, therapy should be continued for at least 10 days
  to decrease the risk of rheumatic fever and glomerulonephritis.
  WARNINGS : (based on the Ministry of Public Health Announcement)
  1. lt is contraindicated in patients with known hypersensitivity to penicillins.
  2. lt may cause hypersensitivity reactions including anaphylactic reactions.
  3. Discontinue the drug and consult the physician ifthere is skin rashes, itching, oredema. PRECAUTIONS :
  1. Should be used with caution in nursing women and neonates.
  2. Safe use during pregnancy has not been established.The drug should be used during pregnancy
  only when clearly needed.
  ADVERSEEFFECTS :
  Gastrointestinal disturbances, such as nausea, vomiting, diarrhea, epigastric discomfort, _atulence,
  have been reported. As like other penicillins, pruritus,
  urticaria, skin rashes, and allergic symptoms may also occur.
  STORAGE :
  ln well-closed container, below 2s° C
  PACKING :
  Box of2S x 20 capsules.
  Box ofSO x 10 capsules.`;
}
