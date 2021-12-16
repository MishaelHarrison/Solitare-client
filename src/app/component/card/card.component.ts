import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Card, CardDefaults } from 'src/app/models/Card';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnChanges {
  @Output() makeSelection: EventEmitter<any> = new EventEmitter();
  @Input() card: Card | null = null;
  @Input() unknownState: 'reverseSide' | 'blank' = 'reverseSide';

  constructor() {}

  ngOnChanges(_changes: SimpleChanges): void {
    this.CardDefault();
  }

  ngOnInit(): void {
    this.CardDefault();
  }

  @HostListener('click', ['$event.target'])
  onClick(_target: any) {
    this.makeSelection.emit({ depth: this.card?.depth });
  }

  private CardDefault(): void {
    this.card =
      this.card ||
      (this.unknownState == 'reverseSide'
        ? CardDefaults.reverseCard()
        : CardDefaults.blankCard());
  }
}
