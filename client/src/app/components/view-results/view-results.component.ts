import { Component, OnInit } from '@angular/core';
import { IcardStack } from 'src/app/interfaces/icard-stack';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {

  constructor() { }

  currentCardStack!: IcardStack;
  answeredCorrectly!: string[];

  ngOnInit(): void {
    this.currentCardStack = JSON.parse(sessionStorage.getItem('stack') || '{}');

    this.answeredCorrectly = JSON.parse(sessionStorage.getItem('answeredCorrectly') || '{}');
  }

}
