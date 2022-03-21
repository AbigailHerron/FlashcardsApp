import { Component, OnInit } from '@angular/core';
import { IcardStack } from 'src/app/interfaces/icard-stack';
import { CardStackServiceService } from 'src/app/services/card-stack-service.service';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {

  currentCardStack$!: IcardStack;
  answeredCorrectly: string[] = [];
  percentage!: Number;
  count = 0;

  constructor(private srvCardStacks: CardStackServiceService) { 
    this.srvCardStacks.deckDetails.subscribe(res => this.currentCardStack$ = res);
  }

  ngOnInit(): void {

    this.answeredCorrectly = JSON.parse(sessionStorage.getItem('answeredCorrectly') || '{}');

    this.calculatePercentage();
  }

  calculatePercentage(){

    this.answeredCorrectly.forEach(element => {

      if (element == "Correct")
      {
        this.count++;
      }

    });

    this.percentage = (this.count / this.answeredCorrectly.length) * 100;
  }
}
