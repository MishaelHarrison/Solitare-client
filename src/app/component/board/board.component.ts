import { Component, OnInit } from '@angular/core';
import { Piles } from 'src/app/models/Board';
import { Card } from 'src/app/models/Card';
import { BoardManagerService } from 'src/app/service/board-retreiver.service';

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

  playNums: number[] = [0, 1, 2, 3, 4, 5, 6];
  winNums: number[] = [0, 1, 2, 3];

  constructor(private service: BoardManagerService) {}

  ngOnInit(): void {
    this.service.createBoard(this.id).subscribe((x) => {
      this.id = x;
      this.getBoard();
    });
  }

  getPile(index: number): Card[] {
    return this.piles![('faceUp' + index) as keyof Piles] as Card[];
  }

  getLength(index: number): number {
    return this.piles![('faceDown' + index) as keyof Piles] as number;
  }

  getWinPileTop(index: number): Card | null {
    let pile: Card[] = this.piles![('win' + index) as keyof Piles] as Card[];
    if (pile) {
      return pile.slice(-1)[0];
    } else return null;
  }

  getBoard(): void {
    this.service.retrieveBoard(this.id!).subscribe((y) => {
      this.piles = y.board;
    });
  }

  getPartialBoard(piles: string[]): void {
    this.service.retrieveBoard(this.id!, piles).subscribe((y) => {
      if (!this.piles) return;
      this.piles = { ...this.piles, ...y.board };
    });
  }

  move(from: string, to: string, depth: number) {
    this.service
      .makeMove(this.id!, from, to, depth)
      .subscribe((success: Boolean) => {
        if (success) this.getPartialBoard([from, to]);
        this.pileSelection = null;
        this.depthSelection = null;
      });
  }

  catchSelection(event: { depth: number }, pileNum: number) {
    if (this.pileSelection == null || this.depthSelection == null) {
      this.pileSelection = 'faceUp' + pileNum;
      this.depthSelection = event.depth;
    } else {
      this.move(this.pileSelection, 'faceUp' + pileNum, this.depthSelection);
    }
  }

  playWinPile(pileNum: number) {
    if (this.pileSelection == null || this.depthSelection == null) {
      this.pileSelection = 'win' + pileNum;
      this.depthSelection = 1;
    } else {
      this.move(this.pileSelection, 'win' + pileNum, this.depthSelection);
    }
  }

  playDrawPile() {
    this.pileSelection = 'drawUp';
    this.depthSelection = 1;
  }

  flipUnknown(pileNum: number) {
    this.move(`faceDown${pileNum}`, `faceUp${pileNum}`, 1);
  }

  clickDrawDeck() {
    if (this.piles?.drawDown! > 0) this.move('drawDown', 'drawUp', 1);
    else this.move('drawUp', 'drawDown', 1);
  }

  selectEmpty(pileNum: number) {
    if (!(this.pileSelection == null || this.depthSelection == null)) {
      this.move(this.pileSelection, 'faceUp' + pileNum, this.depthSelection);
    }
  }
}
