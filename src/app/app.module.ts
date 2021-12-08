import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './component/board/board.component';
import { CardComponent } from './component/card/card.component';
import { PileComponent } from './component/pile/pile.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, CardComponent, PileComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
