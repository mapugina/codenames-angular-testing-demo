import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ICodeNameGameData} from '../icode-name-game-data';
import {ICodenameCard} from '../icodename-card';
import {CodenameTeam} from '../codename-team.enum';

@Component({
  selector: 'app-codenames-game',
  templateUrl: './codenames-game.component.html',
  styleUrls: ['./codenames-game.component.css']
})
export class CodenamesGameComponent implements OnInit, OnChanges {
  @Input() game: ICodeNameGameData;
  @Output() gameOver: EventEmitter<CodenameTeam> = new EventEmitter();

  cards: ICodenameCard[];

  private reds: Set<string>;
  private blues: Set<string>;

  private redPicks = 0;
  private bluePicks = 0;

  constructor() { }

  private static buildCards(codenames: string[]) {
    return codenames.map(codename => ({codename, team: null}));
  }

  private determineTeam(codename: string) {
    if (!this.game) { return null; }

    return this.game.assassin === codename ?
      CodenameTeam.assassin :
      this.reds.has(codename) ? CodenameTeam.red :
        this.blues.has(codename) ? CodenameTeam.blue :
          CodenameTeam.bystander;
  }

  private consumeGame(game: ICodeNameGameData) {
    if (game) {
      this.cards = CodenamesGameComponent.buildCards(game.selection);
      this.reds = new Set(game.reds);
      this.blues = new Set(game.blues);
    } else {
      this.cards = [];
      this.reds = new Set();
      this.blues = new Set();
    }
    this.bluePicks = 0;
    this.redPicks = 0;
  }

  ngOnInit() {
    this.consumeGame(this.game);
  }

  ngOnChanges({game}: SimpleChanges): void {
    if (game) {
      this.consumeGame(game.currentValue);
    }
  }

  reveal(card: ICodenameCard) {
    card.team = this.determineTeam(card.codename);

    switch (card.team) {
      case CodenameTeam.assassin:
        this.gameOver.emit(CodenameTeam.assassin);
        break;
      case CodenameTeam.red:
        this.redPicks++;
        if (this.redPicks === this.game.reds.length) {
          this.gameOver.emit(CodenameTeam.red);
        }
        break;
      case CodenameTeam.blue:
        this.bluePicks++;
        if (this.bluePicks === this.game.blues.length) {
          this.gameOver.emit(CodenameTeam.blue);
        }
    }
  }
}
