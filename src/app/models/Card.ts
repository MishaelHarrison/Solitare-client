import { environment } from 'src/environments/environment';

export interface Card {
  image: String;
  value: String;
  suit: String;
  code: String;
  depth?: number;
}

let cardTemplate = (link: string) => {
  return {
    image: link,
    value: '',
    suit: '',
    code: '',
    depth: 1,
  };
};

export let CardDefaults = {
  reverseCard(): Card {
    return cardTemplate(environment.cardReverseSide);
  },

  blankCard(): Card {
    return cardTemplate(environment.noCardImage);
  },
};
