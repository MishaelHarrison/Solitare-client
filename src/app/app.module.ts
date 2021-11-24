import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './comp/board/board.component';
import { CardComponent } from './comp/card/card.component';
import { PileComponent } from './comp/pile/pile.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    PileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }