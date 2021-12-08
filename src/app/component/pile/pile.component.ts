import { Component, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/Card';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.css'],
})
export class PileComponent implements OnInit {
  @Output() SelectKnown: EventEmitter<any> = new EventEmitter();
  @Output() SelectUnknown: EventEmitter<any> = new EventEmitter();
  @Output() SelectEmpty: EventEmitter<any> = new EventEmitter();

  @Input() unknowns: number = 0;
  @Input() cards: Card[] = [];

  constructor() {}

  ngOnInit(): void {}

  catchSelection(event: any) {
    this.SelectKnown.emit(event);
  }
}
