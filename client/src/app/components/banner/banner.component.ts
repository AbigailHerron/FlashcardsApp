import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private router: Router) { }

  currentUser: User = JSON.parse(localStorage.getItem('currentUser')!);

  ngOnInit(): void {
    // this.currentUser = this.backend.userValue!;
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
}
