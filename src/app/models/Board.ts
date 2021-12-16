import { Card } from './Card';

export interface Board {
  PlayPiles: Card[][];
  HiddenPlayPiles: number[];
  WinPiles: Card[][];
  DrawPile: Card[];
  HiddenDrawPile: number;
}
