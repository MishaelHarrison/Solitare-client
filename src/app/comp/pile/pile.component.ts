import { Component, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/Card';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.css'],
})
export class PileComponent implements OnInit {
  @Output() makeSelection: EventEmitter<any> = new EventEmitter();
  @Output() flipUnknown: EventEmitter<any> = new EventEmitter();

  @Input() unknowns: number = 0;
  @Input() cards: Card[] = [];

  constructor() {}

  ngOnInit(): void {}

  catchSelection(event: any) {
    this.makeSelection.emit(event);
  }
}
