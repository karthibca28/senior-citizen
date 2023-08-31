import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData:any
  constructor() { }

  ngOnInit(): void {
     this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
     console.log(this.userData);
  }
}
