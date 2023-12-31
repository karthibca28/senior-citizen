import {Component} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-rightpanel',
    templateUrl: './app.rightpanel.component.html'
})
export class AppRightpanelComponent{

    amount: SelectItem[];

    selectedAmount: any;

    constructor(public appMain: AppMainComponent) {}
}
