import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board, Piles } from '../models/Board';

@Injectable({
  providedIn: 'root',
})
export class BoardManagerService {
  constructor(private http: HttpClient) {}

  retrieveBoard(
    id: number,
    piles: string[] | null = null
  ): Observable<Partial<Board>> {
    return new Observable<Partial<Board>>((o) => {
      this.http
        .get<Partial<Board>>(
          environment.api + '/' + id + (piles ? '/' + piles!.join(',') : '')
        )
        .subscribe((x) => {
          let k: keyof Piles;
          if (x.board == undefined) return;
          for (k in x.board) {
            let v = x.board[k];
            if (typeof v == 'object') {
              for (let i = 0; i < v.length; i++) {
                v[i].depth = v.length - i;
              }
            }
          }
          o.next(x);
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
    depth: number
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
