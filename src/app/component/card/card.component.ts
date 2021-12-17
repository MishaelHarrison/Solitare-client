import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Card } from 'src/app/models/Card';
import { EventEmitter } from '@angular/core';
import { CardTemplatesService } from 'src/app/service/card-templates.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnChanges {
  @Output() makeSelection: EventEmitter<any> = new EventEmitter();
  @Input() card: Card | null = null;
  @Input() unknownState: 'reverseSide' | 'blank' = 'reverseSide';

  constructor(private cardDefaults: CardTemplatesService) {}

  ngOnChanges(_changes: SimpleChanges): void {
    this.retrieveTemplate();
  }

  ngOnInit(): void {
    this.retrieveTemplate();
  }

  @HostListener('click', ['$event.target'])
  onClick(_target: any) {
    this.makeSelection.emit({ depth: this.card?.depth });
  }

  private retrieveTemplate(): void {
    this.card =
      this.card ||
      (this.unknownState == 'reverseSide'
        ? this.cardDefaults.reverseCard()
        : this.cardDefaults.blankCard());
  }
}
