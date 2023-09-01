import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-medical-type-list',
  templateUrl: './medical-type-list.component.html',
  styleUrls: ['./medical-type-list.component.scss']
})
export class MedicalTypeListComponent implements OnInit {
  dynamaicTableData: any;
  submitted: boolean;
  // isLoader: boolean;
  // isNotLoader: boolean;

  constructor(private formService: FormService, private router: Router, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    // this.isLoader = true;
    this.formService.getAlrMedicalType().subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        // console.log("get data", this.dynamaicTableData)
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

  deleteRecord(mtypeId:number){
    const dataKey = { medicalTypeId: mtypeId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deleteAlrMedicalType(dataKey).subscribe((resp: APIResponse) => {
                // console.log("datakey",dataKey);
                if (resp.statusCode == '200') {
                  this.getList();
                  this.sharedService.showSuccess('Record delete successfully');
                }
            })
        },
        reject: () => {
            this.sharedService.showWarn('Cencelled');
        }
    });
  }

  editRecord(editId:number) {
    this.router.navigateByUrl(`main/master/medical-type-add/${editId}`);
  }
}
