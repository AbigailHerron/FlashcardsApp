import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-stack-menu',
  templateUrl: './view-stack-menu.component.html',
  styleUrls: ['./view-stack-menu.component.css']
})
export class ViewStackMenuComponent implements OnInit {
  currentCardStack?: IcardStack;

  viewStackForm = new FormGroup({
    hints: new FormControl(false, Validators.required),
    timer: new FormControl(false, Validators.required),
    inputs: new FormControl(false, Validators.required),
    timerLength: new FormControl(null, Validators.required),
  });

  constructor(private srvCardStacks: CardStackServiceService, private router: Router) {
    // this.currentCardStack = this.srvCardStacks.deckDetails; // Option 1
   }

  ngOnInit(): void {
    this.currentCardStack = JSON.parse(sessionStorage.getItem('stack') || '{}'); // Option 2

    console.log(this.currentCardStack);
  }

  onSubmit() {

    console.log(this.viewStackForm.value);

    this.router.navigate(['/viewstack']);

    //Use service to send viewStackForm values from viewStackMenu details to viewStack
    // this.srvCardStacks.deckOptions(this.viewStackForm.value); // Option 1

    sessionStorage.setItem('stackOptions', JSON.stringify(this.viewStackForm.value)); // Option 2 
  }
}
