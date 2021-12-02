import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from '../Board';

@Injectable({
  providedIn: 'root',
})
export class BoardRetreiverService {
  constructor(private http: HttpClient) {}

  retrieveFullBoard(id: number): Observable<Board> {
    return this.http.get<Board>(environment.api + '/' + id);
  }

  createBoard(): Observable<number> {
    return this.http.post<number>(environment.api, {});
  }
}
