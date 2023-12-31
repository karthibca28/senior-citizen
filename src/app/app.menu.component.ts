import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { TranslationService } from './shared/services/translation.service';
import { LanguageService } from './shared/services/language.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];
    userData: any;
    myDate = new Date();
    userName: any;
    roleName: any;
    dashboardLabel: string;
    translatedLabels:any
    constructor(public appMain: AppMainComponent,private translationService: TranslationService,private languageService: LanguageService,
        ) {
       
    }
    getTranslation(key: string): string {
        return this.translationService.getTranslation(key);
      }

    ngOnInit() {
        this.translationService.translations$.subscribe(translations => {
            this.translatedLabels = this.getTranslatedLabels(translations);
            this.updateMenuLabels();
        });
        // this.model = [
        //     {label: this.dashboardLabel, icon: 'pi pi-desktop', access: '1,2', routerLink: ['/main'] },
        //     // {
        //     //     label: 'User Config', icon: 'pi pi-th-large', access: '1', routerLink: ['/main/user'],
        //     //     items: [
        //     //         { label: 'User', icon: 'pi pi-circle', routerLink: ['/main/user'] },
        //     //         { label: 'Role', icon: 'pi pi-circle', routerLink: ['/main/user-config/role-list'] }
        //     //     ]
        //     // },
        //     {
        //         label: 'Services', icon: 'pi pi-microsoft', access: '1', routerLink: ['/main/master'],
        //         items: [
        //             { label: 'District', routerLink: ['/main/master/district'] }, 
        //             { label: 'Hospital', routerLink: ['/main/master/hospital'] },
        //             { label: 'Medical type', routerLink: ['/main/master/medical-type'] },
        //             { label: 'Medical', routerLink: ['/main/master/medical'] },
        //             { label: 'Officer type', routerLink: ['/main/master/officer-type'] },
        //             { label: 'Officer', routerLink: ['/main/master/officer'] },
        //             { label: 'Old age type', routerLink: ['/main/master/oldage-type'] },
        //             { label: 'Old age', routerLink: ['/main/master/oldage'] },
        //             { label: 'People pharmacy', routerLink: ['/main/master/people-pharmacy'] },
        //             { label: 'Legal aid', routerLink: ['/main/master/legal-aid'] },
        //             { label: 'Grievance', routerLink: ['/main/master/grievance'] }
        //         ]
        //     },
        //     { label: 'Schemes', icon: 'pi pi-envelope', access: '1', routerLink: ['/main/scheme'] },
        //     { label: 'Feedback', icon: 'pi pi-check-square', access: '1', routerLink: ['/main/feedback'] },
        //     { label: 'User', icon: 'pi pi-user', access: '1', routerLink: ['/main/user'] },
        //     {
        //         label: 'Reports', icon: 'pi pi-qrcode', access: '1', routerLink: ['/main/report'],
        //         items: [
        //             { label: 'Senior Citizen',  routerLink: ['/main/report/scDetails'] },
        //             { label: 'Total App Install',  routerLink: ['/main/report/mobileAppInstalled'] },
        //             // { label: 'Yearly',  routerLink: ['/main/master/customer'] }
        //         ]
        //     }
        // ];
        this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
        this.userName = this.userData.data.firstName;
        this.roleName = this.userData.data.role;
        if (this.userData.data.roleId === 1) { 
            this.model = this.model.filter(f => f.access.includes('1'))
        } else if(this.userData.data.roleId === 2) {
            this.model = this.model.filter(f => f.access.includes('2'))
        }
    }
    private getTranslatedLabels(translations: any): { [key: string]: string } {
        return {
            dashboard: translations['dashboard'],
            service: translations['service'],
            district: translations['district'],
            hospital: translations['hospital'],
            medicalType: translations['medicalType'],
            medical: translations['medical'],
            officerType: translations['officerType'],
            officer: translations['officer'],
            oldAgeType: translations['oldAgeType'],
            oldageHomes: translations['oldageHomes'],
            peoplePharmacy: translations['peoplePharmacy'],
            legalAid: translations['legalAid'],
            grievance: translations['grievance'],
            schemes: translations['schemes'],
            feedBack: translations['feedback'],
            report: translations['reports'],
            seniorCitizen: translations['seniorcitizen'],
            totalAppInstall: translations['totalAppInstall'],
            user: translations['user'],
            userdetails:translations['userdetails']
        };
    }

    private updateMenuLabels() {
        this.model = [
            { label:  this.translatedLabels.dashboard, icon: 'pi pi-desktop', access: '1,2,3', routerLink: ['/main'] },
            {
                label: this.translatedLabels.service, icon: 'pi pi-microsoft', access: '1,3', routerLink: ['/main/master'],
                items: [
                    { label:this.translatedLabels.district, routerLink: ['/main/master/district'] }, 
                    { label: this.translatedLabels.hospital, routerLink: ['/main/master/hospital'] },
                    { label: this.translatedLabels.medicalType, routerLink: ['/main/master/medical-type'] },
                    { label: this.translatedLabels.medical, routerLink: ['/main/master/medical'] },
                    { label: this.translatedLabels.officerType, routerLink: ['/main/master/officer-type'] },
                    { label: this.translatedLabels.officer, routerLink: ['/main/master/officer'] },
                    { label: this.translatedLabels.oldAgeType, routerLink: ['/main/master/oldage-type'] },
                    { label: this.translatedLabels.oldageHomes, routerLink: ['/main/master/oldage'] },
                    { label: this.translatedLabels.peoplePharmacy, routerLink: ['/main/master/people-pharmacy'] },
                    { label: this.translatedLabels.legalAid, routerLink: ['/main/master/legal-aid'] },
                    { label: this.translatedLabels.grievance, routerLink: ['/main/master/grievance'] }
                ]
            },
            { label: this.translatedLabels.schemes, icon: 'pi pi-envelope', access: '1,3', routerLink: ['/main/scheme'] },
            { label: this.translatedLabels.feedBack, icon: 'pi pi-check-square', access: '1,3', routerLink: ['/main/feedback'] },
            { label: this.translatedLabels.user, icon: 'pi pi-user', access: '1,3', routerLink: ['/main/user/user-form'] },
            {
                label: this.translatedLabels.report, icon: 'pi pi-qrcode', access: '1,3', routerLink: ['/main/report'],
                items: [
                    { label: this.translatedLabels.seniorCitizen,  routerLink: ['/main/report/scDetails'] },
                    { label: this.translatedLabels.totalAppInstall,  routerLink: ['/main/report/mobileAppInstalled'] },
                    { label: this.translatedLabels.userdetails,  routerLink: ['/main/report/userdetails'] },
                ]
            }
        ];
    }
}