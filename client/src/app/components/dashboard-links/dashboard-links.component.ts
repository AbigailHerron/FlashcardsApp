import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-dashboard-links',
  templateUrl: './dashboard-links.component.html',
  styleUrls: ['./dashboard-links.component.css']
})
export class DashboardLinksComponent implements OnInit {

  constructor(private session: SessionQuery) { }

  ngOnInit(): void {

    console.log("Welcome to the dashboard");

    console.log(this.session.userDetails$);
  }
}
