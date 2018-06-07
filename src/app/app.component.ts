import {Component} from '@angular/core';
import {CodenamesRestService} from './game-board/codenames-rest.service';
import {ICodeNameGameData} from './game-board/icode-name-game-data';
import {CodenameTeam} from './game-board/codename-team.enum';

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

  constructor(codeNamesRestService: CodenamesRestService) {
    codeNamesRestService.newGame().subscribe(x => {
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

  reveal(card: ICardScope) {
    const reds = new Set(this.game.reds);
    const blues = new Set(this.game.blues);

    card.revealed = true;
    card.team = this.game.assassin === card.codename ?
      CodenameTeam.assassin :
      reds.has(card.codename) ? CodenameTeam.red :
        blues.has(card.codename) ? CodenameTeam.blue :
          CodenameTeam.bystander;
  }
}
