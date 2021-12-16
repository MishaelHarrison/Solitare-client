import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from '../models/Board';
import { Card } from '../models/Card';
import { GetPilesFromHttp, PileNames } from '../models/PileNames';

@Injectable({
  providedIn: 'root',
})
export class BoardManagerService {
  constructor(private http: HttpClient) {}

  private setCardDepths(pile: Card[]): Card[] {
    pile.forEach((card, i) => {
      card.depth = pile.length - i;
    });
    return pile;
  }

  retrieveBoard(id: number): Observable<Board> {
    return new Observable<Board>((o) => {
      this.http.get<any>(environment.api + '/' + id).subscribe((x) => {
        x = GetPilesFromHttp(x);
        o.next({
          PlayPiles: [0, 1, 2, 3, 4, 5, 6].map((z) =>
            this.setCardDepths(x[PileNames.PlayPile(z)] as Card[])
          ),
          HiddenPlayPiles: [0, 1, 2, 3, 4, 5, 6].map(
            (z) => x[PileNames.HiddenPlayPile(z)] as number
          ),
          WinPiles: [0, 1, 2, 3].map((z) => x[PileNames.WinPile(z)] as Card[]),
          DrawPile: x[PileNames.DrawPile] as Card[],
          HiddenDrawPile: x[PileNames.HiddenDrawPile] as number,
        });
      });
    });
  }

  updateBoard(id: number, piles: string[], board: Board): Observable<void> {
    return new Observable<void>((o) => {
      this.http
        .get<any>(environment.api + '/' + id + '/' + piles.join(','))
        .subscribe((x) => {
          x = GetPilesFromHttp(x);
          for (let i = 0; i < 7; i++) {
            let pile: Card[] | undefined = x[PileNames.PlayPile(i)];
            if (pile != undefined) {
              board.PlayPiles[i] = this.setCardDepths(pile);
            }
            let hiddenPile: number | undefined = x[PileNames.HiddenPlayPile(i)];
            if (hiddenPile != undefined) {
              board.HiddenPlayPiles[i] = hiddenPile;
            }
          }
          for (let i = 0; i < 4; i++) {
            let win: Card[] | undefined = x[PileNames.WinPile(i)];
            if (win != undefined) {
              board.WinPiles[i] = win;
            }
          }
          let drawPile: Card[] | undefined = x[PileNames.DrawPile];
          if (drawPile != undefined) {
            board.DrawPile = drawPile;
          }
          let hiddenDrawPile: number | undefined = x[PileNames.HiddenDrawPile];
          if (hiddenDrawPile != undefined) {
            board.HiddenDrawPile = hiddenDrawPile;
          }
          o.next();
        });
    });
  }

  createBoard(id: number | null): Observable<number> {
    return this.http.post<number>(
      environment.api + (id != null ? `/${id}` : ''),
      {}
    );
  }

  makeMove(
    id: number,
    from: string,
    to: string,
    depth: number = 1
  ): Observable<boolean> {
    return new Observable((o) => {
      this.http
        .post(
          environment.api + `/${id}/move/${from}/${to}/${depth}`,
          {},
          { observe: 'response' }
        )
        .subscribe(
          (x) => {
            o.next(x.ok);
          },
          (_error) => {
            o.next(false);
          }
        );
    });
  }
}
