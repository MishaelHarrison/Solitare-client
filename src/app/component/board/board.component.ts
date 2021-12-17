import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/Board';
import { Card } from 'src/app/models/Card';
import { BoardManagerService } from 'src/app/service/board-retreiver.service';
import { PileFormatingContextService } from 'src/app/service/pile-formating-context.service';

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

  private pileSelection: string | null = null;
  private depthSelection: number | null = null;

  constructor(
    private service: BoardManagerService,
    private PileNames: PileFormatingContextService
  ) {}

  ngOnInit(): void {
    this.service.createBoard(this.id).subscribe((x) => {
      this.id = x;
      this.retrieveBoard();
    });
  }

  everythingExists(): boolean {
    return this.PlayPiles &&
      this.HiddenPlayPiles &&
      this.WinPiles &&
      this.DrawPile &&
      this.HiddenDrawPile != undefined
      ? true
      : false;
  }

  private retrieveBoard(): void {
    this.service.retrieveBoard(this.id!).subscribe((y) => {
      this.PlayPiles = y.PlayPiles;
      this.HiddenPlayPiles = y.HiddenPlayPiles;
      this.WinPiles = y.WinPiles;
      this.DrawPile = y.DrawPile;
      this.HiddenDrawPile = y.HiddenDrawPile;
    });
  }

  private retrievePartialBoard(piles: string[]): void {
    this.service.updateBoard(this.id!, piles, this).subscribe();
  }

  private move(from: string, to: string, depth: number) {
    this.service
      .makeMove(this.id!, from, to, depth)
      .subscribe((success: Boolean) => {
        if (success) {
          this.retrievePartialBoard([from, to]);
        }
        this.pileSelection = null;
        this.depthSelection = null;
      });
  }

  catchSelection(event: { depth: number }, pileNum: number) {
    if (this.pileSelection == null || this.depthSelection == null) {
      this.pileSelection = this.PileNames.PlayPile(pileNum);
      this.depthSelection = event.depth;
    } else {
      this.move(
        this.pileSelection,
        this.PileNames.PlayPile(pileNum),
        this.depthSelection
      );
    }
  }

  playWinPile(pileNum: number) {
    if (this.pileSelection == null || this.depthSelection == null) {
      this.pileSelection = this.PileNames.WinPile(pileNum);
      this.depthSelection = 1;
    } else {
      this.move(
        this.pileSelection,
        this.PileNames.WinPile(pileNum),
        this.depthSelection
      );
    }
  }

  playDrawPile() {
    this.pileSelection = this.PileNames.DrawPile;
    this.depthSelection = 1;
  }

  flipUnknown(pileNum: number) {
    this.move(
      this.PileNames.HiddenPlayPile(pileNum),
      this.PileNames.PlayPile(pileNum),
      1
    );
  }

  clickDrawDeck() {
    if (this.HiddenDrawPile > 0) {
      this.move(this.PileNames.HiddenDrawPile, this.PileNames.DrawPile, 1);
    } else {
      this.move(this.PileNames.DrawPile, this.PileNames.HiddenDrawPile, 1);
    }
  }

  selectEmpty(pileNum: number) {
    if (!(this.pileSelection == null || this.depthSelection == null)) {
      this.move(
        this.pileSelection,
        this.PileNames.PlayPile(pileNum),
        this.depthSelection
      );
    }
  }
}
