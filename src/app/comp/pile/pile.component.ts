import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/Card';

@Component({
  selector: 'app-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.css']
})
export class PileComponent implements OnInit {

  @Input() unknowns: number = 0;
  @Input() cards: Card[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
