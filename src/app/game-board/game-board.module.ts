import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodenamesRestService } from './codenames-rest.service';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CodenameCardComponent } from './codename-card/codename-card.component';
import { CodenamesGameComponent } from './codenames-game/codenames-game.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    CodenamesGameComponent
  ],
  declarations: [
    CodenameCardComponent,
    CodenamesGameComponent
  ],
  providers: [
    CodenamesRestService
  ]
})
export class GameBoardModule { }
