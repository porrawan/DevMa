import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private companyService: CompanyService
  ) { }

  mode: string = "ADD";
  id: number = 0;
  compCode: string;
  compName: string;

  ngOnInit() {

    this.loadItem();
  }
  loadItem() {
    this.activeRoute.params.subscribe(param => {
      if (param['id']) {
        let id = param['id'];
        this.companyService.findbyID(id).subscribe(company => {
          this.id = id;
          this.compCode = company.compCode;
          this.compName = company.compName;
          this.mode = "EDIT"
          setTimeout(function () {
            Materialize.updateTextFields();
          }, 50);


        },
          err => {
            console.log(err);
          });
        // datas => {
        //   let companyData = JSON.parse(localStorage.getItem('company'));
        //   let company = companyData[id];
        //   this.compCode = company.compCode;
        //   this.compName = company.compName;
        //   this.id = id;
        // },
        // err => {
        //   console.log(err);
        // });

      }
    })
  }

  onSave() {
    let comp = {
      compCode: this.compCode,
      compName: this.compName
    }
    let company: Array<any> = [];
    if (localStorage.getItem('company')) {
      company = JSON.parse(localStorage.getItem('company'));

    }
    if (this.mode == "EDIT") {
      company[this.id] = comp;
      this.companyService.updateItem(this.id, comp).subscribe(
        data => {
          Materialize.toast('Update item complete', 1000);
          this.router.navigate(['support', 'company-list']);
        },
        err => {
          console.log(err);
        }
      )
      // Materialize.toast('Update Completed', 1000);
    } else {
      // company.push(comp);
      //Materialize.toast('Save Completed', 1000);
      this.companyService.addItem(comp).subscribe(
        datas => {
          Materialize.toast('Add new item complete', 1000);
          this.router.navigate(['support', 'company-list']);
        },
        err => {
          console.log(err);
        });



    }
    //localStorage.setItem('company', JSON.stringify(company));


  }

}
