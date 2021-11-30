import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-stack',
  templateUrl: './create-stack.component.html',
  styleUrls: ['./create-stack.component.css']
})
export class CreateStackComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addCardToStack(): void {

    // this.http
    //   .post('http://localhost:3000/user/' ,a )
    //   .subscribe(

    //   );
  }

}
