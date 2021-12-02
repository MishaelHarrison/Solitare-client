import { Component, OnInit } from '@angular/core';
import { Piles } from 'src/app/Board';
import { BoardRetreiverService } from 'src/app/serv/board-retreiver.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  piles?: Piles;
  id: number | null = null;

  constructor(private service: BoardRetreiverService) {}

  ngOnInit(): void {
    if (this.id == null) {
      this.service.createBoard().subscribe((x) => {
        this.id = x;
        console.log(this.id);
        this.service.retrieveFullBoard(x).subscribe((x) => {
          this.piles = x.board;
        });
      });
    } else
      this.service.retrieveFullBoard(this.id).subscribe((x) => {
        this.piles = x.board;
      });
  }
}
