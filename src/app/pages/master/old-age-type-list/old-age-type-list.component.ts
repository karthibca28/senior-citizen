import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-old-age-type-list',
  templateUrl: './old-age-type-list.component.html',
  styleUrls: ['./old-age-type-list.component.scss']
})
export class OldAgeTypeListComponent implements OnInit {
  dynamaicTableData: any;
  submitted: boolean;
  currentLanguage:any
  // isLoader: boolean;
  // isNotLoader: boolean;

  constructor(public translationService: TranslationService,private formService: FormService, private router: Router, private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,private confirmationService: ConfirmationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
    this.getList();
    });
  }
  
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  getList() {
    // this.isLoader = true;
    this.formService.getOldAgeType(this.currentLanguage).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        // this.isNotLoader = true;
        // this.isLoader = false;
    }else {
      this.sharedService.showError('Error');
    }
  },
  (error) => {
    this.sharedService.showError('Error');
  }
)
  }

  deleteRecord(oatId:number){
    const dataKey = { oahTypeId: oatId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deleteoahType(dataKey).subscribe((resp: APIResponse) => {
                // console.log("datakey",dataKey);
                if (resp.statusCode == '200') {
                  this.getList();
                  this.sharedService.showSuccess('Record delete successfully');
                }
            })
        },
        reject: () => {
            this.sharedService.showWarn('Cancelled');
        }
    });
  }

  editRecord(editId:number) {
    this.router.navigateByUrl(`main/master/oldage-type-add/${editId}`);
  }

}
