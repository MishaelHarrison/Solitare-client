import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board, Piles } from '../Board';

@Injectable({
  providedIn: 'root',
})
export class BoardManagerService {
  constructor(private http: HttpClient) {}

  retrieveFullBoard(id: number): Observable<Board> {
    return new Observable<Board>((o) => {
      this.http.get<Board>(environment.api + '/' + id).subscribe((x) => {
        let k: keyof Piles;
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

  createBoard(): Observable<number> {
    return this.http.post<number>(environment.api, {});
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
          (error) => {
            o.next(false);
          }
        );
    });
  }
}
