import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from '../models/Card';

@Injectable({
  providedIn: 'root',
})
export class CardTemplatesService {
  private cardTemplate(link: string): Card {
    return {
      image: link,
      value: '',
      suit: '',
      code: '',
      depth: 1,
    };
  }

  reverseCard(): Card {
    return this.cardTemplate(environment.cardReverseSide);
  }

  blankCard(): Card {
    return this.cardTemplate(environment.noCardImage);
  }
}
