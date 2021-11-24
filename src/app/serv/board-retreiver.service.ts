import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../Board';

@Injectable({
  providedIn: 'root'
})
export class BoardRetreiverService {

  constructor() { }

  retrieveFullBoard(id: number): Observable<Board>{
    return new Observable(o=>{
      o.next({
        id: 1,
        board: {
            drawDown: 24,
            win2: [],
            drawUp: [],
            win0: [],
            faceUp4: [],
            faceDown5: 5,
            faceUp3: [
                {
                    image: "https://deckofcardsapi.com/static/img/7S.png",
                    value: "7",
                    suit: "SPADES",
                    code: "7S"
                }
            ],
            faceDown3: 3,
            faceDown4: 4,
            faceDown2: 2,
            faceUp0: [
                {
                    image: "https://deckofcardsapi.com/static/img/JD.png",
                    value: "JACK",
                    suit: "DIAMONDS",
                    code: "JD"
                }
            ],
            win3: [],
            faceUp1: [
                {
                    image: "https://deckofcardsapi.com/static/img/5H.png",
                    value: "5",
                    suit: "HEARTS",
                    code: "5H"
                }
            ],
            faceUp2: [
                {
                    image: "https://deckofcardsapi.com/static/img/4C.png",
                    value: "4",
                    suit: "CLUBS",
                    code: "4C"
                }
            ],
            faceDown6: 6,
            faceUp5: [
                {
                    image: "https://deckofcardsapi.com/static/img/2D.png",
                    value: "2",
                    suit: "DIAMONDS",
                    code: "2D"
                }
            ],
            faceDown0: 0,
            faceDown1: 1,
            faceUp6: [
                {
                    image: "https://deckofcardsapi.com/static/img/JS.png",
                    value: "JACK",
                    suit: "SPADES",
                    code: "JS"
                }
            ],
            win1: []
        }
    })
    });
  }
}
