import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodenamesRestService } from './codenames-rest.service';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    CodenamesRestService
  ]
})
export class GameBoardModule { }
