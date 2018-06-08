import {Component} from '@angular/core';
import {CodenamesRestService} from './game-board/codenames-rest.service';
import {ICodeNameGameData} from './game-board/icode-name-game-data';

interface ICardScope {
  codename: string;
  team: string;
  revealed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  game: ICodeNameGameData;
  cards: ICardScope[];
  reds: Set<string>;
  blues: Set<string>;

  public fetchGame() {
    this.codeNamesRestService.newGame().subscribe(x => {
      this.game = x;
      this.cards = x.selection.map(codename => ({
        codename,
        team: null,
        revealed: false
      }));
      this.reds = new Set(this.game.reds);
      this.blues = new Set(this.game.blues);
      return this.game;
    });
  }

  constructor(private codeNamesRestService: CodenamesRestService) {
    this.fetchGame();
  }

  public gameOver(winner) {
    alert(`this game is over ${winner} wins!`);
    this.fetchGame();
  }
}
