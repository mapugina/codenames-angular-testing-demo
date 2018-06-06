import { Component } from '@angular/core';
import {CodenamesRestService} from './game-board/codenames-rest.service';
import {ICodeNameGameData} from './game-board/icode-name-game-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  game: ICodeNameGameData;

  constructor(codeNamesRestService: CodenamesRestService) {
    codeNamesRestService.newGame().subscribe(x => this.game = x);
  }
}
