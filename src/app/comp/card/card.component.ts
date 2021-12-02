import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Card } from 'src/app/Card';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {

  @Input() card: Card | null = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setCardDefault()
  }

  ngOnInit(): void {
    this.setCardDefault()
  }

  setCardDefault(): void{
    this.card = this.card ||
    {
    image: environment.cardReverseSide,
    value: "",
    suit: "",
    code: ""
  }
  }

}
