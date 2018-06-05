import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodenamesRestService } from './codenames-rest.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    CodenamesRestService
  ]
})
export class GameBoardModule { }
