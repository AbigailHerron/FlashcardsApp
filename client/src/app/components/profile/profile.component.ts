import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | undefined = this.backEndService.userValue!;

  constructor(private backEndService : BackendService) { }

  ngOnInit(): void {

  }
}
