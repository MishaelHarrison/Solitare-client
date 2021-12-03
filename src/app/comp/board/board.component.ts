import { Component, OnInit } from '@angular/core';
import { Piles } from 'src/app/Board';
import { BoardManagerService } from 'src/app/serv/board-retreiver.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  piles?: Piles;
  id: number | null = null;

  pileSelection: string | null = null;
  depthSelection: number | null = null;

  constructor(private service: BoardManagerService) {}

  ngOnInit(): void {
    if (!this.id)
      this.service.createBoard().subscribe((x) => {
        this.id = x;
        this.getBoard();
      });
    else this.getBoard();
  }

  getBoard(): void {
    this.service.retrieveFullBoard(this.id!).subscribe((y) => {
      this.piles = y.board;
    });
  }

  move(from: string, to: string, depth: number) {
    this.service
      .makeMove(this.id!, from, to, depth)
      .subscribe((success: Boolean) => {
        if (success) this.getBoard();
        this.pileSelection = null;
        this.depthSelection = null;
      });
  }

  catchSelection(event: { pile: string; depth: number }) {
    if (this.pileSelection == null || this.depthSelection == null) {
      this.pileSelection = event.pile;
      this.depthSelection = event.depth;
    } else {
      this.move(this.pileSelection, event.pile, this.depthSelection);
    }
  }

  flipUnknown(pileNum: number) {
    this.move(`faceDown${pileNum}`, `faceUp${pileNum}`, 1);
  }

  clickDrawDeck() {
    if (this.piles?.drawDown! > 0) this.move('drawDown', 'drawUp', 1);
    else this.move('drawUp', 'drawDown', 1);
  }
}
