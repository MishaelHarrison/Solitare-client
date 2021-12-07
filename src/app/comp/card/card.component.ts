import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Card } from 'src/app/Card';
import { environment } from 'src/environments/environment';
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

  ngOnChanges(changes: SimpleChanges): void {
    this.setCardDefault();
  }

  ngOnInit(): void {
    this.setCardDefault();
  }

  @HostListener('click', ['$event.target'])
  onClick(target: any) {
    this.makeSelection.emit({ depth: this.card?.depth });
  }

  setCardDefault(): void {
    this.card =
      this.card ||
      (this.unknownState == 'reverseSide'
        ? {
            image: environment.cardReverseSide,
            value: '',
            suit: '',
            code: '',
            depth: 1,
          }
        : {
            image: environment.noCardImage,
            value: '',
            suit: '',
            code: '',
            depth: 1,
          });
  }
}
