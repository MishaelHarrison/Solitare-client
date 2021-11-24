import { Component, OnInit } from '@angular/core';
import { Piles } from 'src/app/Board';
import { BoardRetreiverService } from 'src/app/serv/board-retreiver.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  piles?: Piles;
  id: number = 1;

  constructor(private service: BoardRetreiverService) { }

  ngOnInit(): void {
    this.service.retrieveFullBoard(this.id).subscribe(x=>{
      this.piles = x.board;
      this.id = x.id;
    });
  }

}
