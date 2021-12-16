let PlayPile0 = 'faceUp0';
let PlayPile1 = 'faceUp1';
let PlayPile2 = 'faceUp2';
let PlayPile3 = 'faceUp3';
let PlayPile4 = 'faceUp4';
let PlayPile5 = 'faceUp5';
let PlayPile6 = 'faceUp6';
let HiddenPlayPile0 = 'faceDown0';
let HiddenPlayPile1 = 'faceDown1';
let HiddenPlayPile2 = 'faceDown2';
let HiddenPlayPile3 = 'faceDown3';
let HiddenPlayPile4 = 'faceDown4';
let HiddenPlayPile5 = 'faceDown5';
let HiddenPlayPile6 = 'faceDown6';
let WinPile0 = 'win0';
let WinPile1 = 'win1';
let WinPile2 = 'win2';
let WinPile3 = 'win3';
let DrawPile = 'drawUp';
let HiddenDrawPile = 'drawDown';

export let PileNames = {
  PlayPile0: PlayPile0,
  PlayPile1: PlayPile1,
  PlayPile2: PlayPile2,
  PlayPile3: PlayPile3,
  PlayPile4: PlayPile4,
  PlayPile5: PlayPile5,
  PlayPile6: PlayPile6,
  HiddenPlayPile0: HiddenPlayPile0,
  HiddenPlayPile1: HiddenPlayPile1,
  HiddenPlayPile2: HiddenPlayPile2,
  HiddenPlayPile3: HiddenPlayPile3,
  HiddenPlayPile4: HiddenPlayPile4,
  HiddenPlayPile5: HiddenPlayPile5,
  HiddenPlayPile6: HiddenPlayPile6,
  WinPile0: WinPile0,
  WinPile1: WinPile1,
  WinPile2: WinPile2,
  WinPile3: WinPile3,
  DrawPile: DrawPile,
  HiddenDrawPile: HiddenDrawPile,

  PlayPile: (num: number): string => {
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
  },

  HiddenPlayPile: (num: number): string => {
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
  },

  WinPile: (num: number): string => {
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
  },
};

export let GetPilesFromHttp = (responce: any) => responce['board'];
