import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/Board';
import { Card } from 'src/app/models/Card';
import { PileNames } from 'src/app/models/PileNames';
import { BoardManagerService } from 'src/app/service/board-retreiver.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, Board {
  PlayPiles!: Card[][];
  HiddenPlayPiles!: number[];
  WinPiles!: Card[][];
  DrawPile!: Card[];
  HiddenDrawPile!: number;

  id: number | null = null;

  pileSelection: string | null = null;
  depthSelection: number | null = null;

  constructor(private service: BoardManagerService) {}

  everythingExists(): boolean {
    return this.PlayPiles &&
      this.HiddenPlayPiles &&
      this.WinPiles &&
      this.DrawPile &&
      this.HiddenDrawPile != undefined
      ? true
      : false;
  }

  ngOnInit(): void {
    this.service.createBoard(this.id).subscribe((x) => {
      this.id = x;
      this.getBoard();
    });
  }

  getBoard(): void {
    this.service.retrieveBoard(this.id!).subscribe((y) => {
      this.PlayPiles = y.PlayPiles;
      this.HiddenPlayPiles = y.HiddenPlayPiles;
      this.WinPiles = y.WinPiles;
      this.DrawPile = y.DrawPile;
      this.HiddenDrawPile = y.HiddenDrawPile;
    });
  }

  getPartialBoard(piles: string[]): void {
    this.service.updateBoard(this.id!, piles, this).subscribe();
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
      this.pileSelection = PileNames.PlayPile(pileNum);
      this.depthSelection = event.depth;
    } else {
      this.move(
        this.pileSelection,
        PileNames.PlayPile(pileNum),
        this.depthSelection
      );
    }
  }

  playWinPile(pileNum: number) {
    if (this.pileSelection == null || this.depthSelection == null) {
      this.pileSelection = PileNames.WinPile(pileNum);
      this.depthSelection = 1;
    } else {
      this.move(
        this.pileSelection,
        PileNames.WinPile(pileNum),
        this.depthSelection
      );
    }
  }

  playDrawPile() {
    this.pileSelection = PileNames.DrawPile;
    this.depthSelection = 1;
  }

  flipUnknown(pileNum: number) {
    this.move(
      PileNames.HiddenPlayPile(pileNum),
      PileNames.PlayPile(pileNum),
      1
    );
  }

  clickDrawDeck() {
    if (this.HiddenDrawPile > 0)
      this.move(PileNames.HiddenDrawPile, PileNames.DrawPile, 1);
    else this.move(PileNames.DrawPile, PileNames.HiddenDrawPile, 1);
  }

  selectEmpty(pileNum: number) {
    if (!(this.pileSelection == null || this.depthSelection == null)) {
      this.move(
        this.pileSelection,
        PileNames.PlayPile(pileNum),
        this.depthSelection
      );
    }
  }
}
