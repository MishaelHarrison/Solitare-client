import { Injectable } from '@angular/core';

const PlayPile0 = 'faceUp0';
const PlayPile1 = 'faceUp1';
const PlayPile2 = 'faceUp2';
const PlayPile3 = 'faceUp3';
const PlayPile4 = 'faceUp4';
const PlayPile5 = 'faceUp5';
const PlayPile6 = 'faceUp6';
const HiddenPlayPile0 = 'faceDown0';
const HiddenPlayPile1 = 'faceDown1';
const HiddenPlayPile2 = 'faceDown2';
const HiddenPlayPile3 = 'faceDown3';
const HiddenPlayPile4 = 'faceDown4';
const HiddenPlayPile5 = 'faceDown5';
const HiddenPlayPile6 = 'faceDown6';
const WinPile0 = 'win0';
const WinPile1 = 'win1';
const WinPile2 = 'win2';
const WinPile3 = 'win3';
const DrawPile = 'drawUp';
const HiddenDrawPile = 'drawDown';
const BoardLabel = 'board';

@Injectable({
  providedIn: 'root',
})
export class PileFormatingContextService {
  PlayPile0 = PlayPile0;
  PlayPile1 = PlayPile1;
  PlayPile2 = PlayPile2;
  PlayPile3 = PlayPile3;
  PlayPile4 = PlayPile4;
  PlayPile5 = PlayPile5;
  PlayPile6 = PlayPile6;
  HiddenPlayPile0 = HiddenPlayPile0;
  HiddenPlayPile1 = HiddenPlayPile1;
  HiddenPlayPile2 = HiddenPlayPile2;
  HiddenPlayPile3 = HiddenPlayPile3;
  HiddenPlayPile4 = HiddenPlayPile4;
  HiddenPlayPile5 = HiddenPlayPile5;
  HiddenPlayPile6 = HiddenPlayPile6;
  WinPile0 = WinPile0;
  WinPile1 = WinPile1;
  WinPile2 = WinPile2;
  WinPile3 = WinPile3;
  DrawPile = DrawPile;
  HiddenDrawPile = HiddenDrawPile;

  PlayPile(num: number): string {
    switch (num) {
      case 0:
        return PlayPile0;
      case 1:
        return PlayPile1;
      case 2:
        return PlayPile2;
      case 3:
        return PlayPile3;
      case 4:
        return PlayPile4;
      case 5:
        return PlayPile5;
      case 6:
        return PlayPile6;
      default:
        throw new Error('pile num outside of bounds');
    }
  }

  HiddenPlayPile(num: number): string {
    switch (num) {
      case 0:
        return HiddenPlayPile0;
      case 1:
        return HiddenPlayPile1;
      case 2:
        return HiddenPlayPile2;
      case 3:
        return HiddenPlayPile3;
      case 4:
        return HiddenPlayPile4;
      case 5:
        return HiddenPlayPile5;
      case 6:
        return HiddenPlayPile6;
      default:
        throw new Error('pile num outside of bounds');
    }
  }

  WinPile(num: number): string {
    switch (num) {
      case 0:
        return WinPile0;
      case 1:
        return WinPile1;
      case 2:
        return WinPile2;
      case 3:
        return WinPile3;
      default:
        throw new Error('pile num outside of bounds');
    }
  }

  GetPilesFromHttp(responce: any) {
    return responce[BoardLabel];
  }
}
