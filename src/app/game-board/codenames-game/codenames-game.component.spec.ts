import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodenamesGameComponent } from './codenames-game.component';
import {ICodeNameGameData} from '../icode-name-game-data';
import {CodenameTeam} from '../codename-team.enum';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';



fdescribe('CodenamesGameComponent', () => {
  let mockGame: ICodeNameGameData;
  let component: CodenamesGameComponent;
  let fixture: ComponentFixture<CodenamesGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodenamesGameComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodenamesGameComponent);
    component = fixture.componentInstance;
    mockGame = {firstTeam: CodenameTeam.blue, selection: ['A', 'B', 'C', 'D'], reds: ['A'], blues: ['B'], assassin: 'C'};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    let firstMockCards;
    beforeEach(() => {
      component.game = mockGame;
      fixture.detectChanges();
      firstMockCards = [
        {codename: 'A', team: null},
        {codename: 'B', team: null},
        {codename: 'C', team: null},
        {codename: 'D', team: null}
      ];
    });

    it('should say which team goes first', () => {
      const el = fixture.nativeElement.querySelector('span.first-team');
      expect(el.textContent).toBe(mockGame.firstTeam);
    });

    it('should generate cards when game is passed in', () => {
      expect(component.cards).toEqual(firstMockCards);
    });

    it('should update cards if a new game is passed', () => {
      const secondMockGame = {firstTeam: CodenameTeam.red, selection: ['E', 'F', 'G', 'H'], reds: ['E'], blues: ['F'], assassin: 'G'};
      component.game = secondMockGame;
      fixture.detectChanges();
      component.ngOnChanges({game: new SimpleChange(mockGame, secondMockGame, false)});

      expect(component.cards).toEqual([
        {codename: 'E', team: null},
        {codename: 'F', team: null},
        {codename: 'G', team: null},
        {codename: 'H', team: null}
      ]);
    });

    it('should not update cards change occurs without game', () => {
      component.ngOnChanges({});
      expect(component.cards).toEqual(firstMockCards);
    });

    it('should destroy cards if game ceases to exist', () => {
      component.ngOnChanges({game: new SimpleChange(mockGame, null, false)});
      expect(component.cards).toEqual([]);
    });
  });

  describe('#reveal', () => {
    beforeEach(() => {
      component.game = mockGame;
      fixture.detectChanges();
      component.ngOnChanges({game: new SimpleChange(null, mockGame, false)});
    });

    it('should return null if there is no game', () => {
      component.game = null;
      component.reveal({codename: 'Oh dear', team: null});
    });

    it('should give a card a red team designation on reveal if it is in the game\'s reds array', () => {
      const card = {codename: 'A', team: null};
      component.reveal(card);
      expect(card.team).toBe(CodenameTeam.red);
    });

    it('should give a card a blue team designation on reveal if it is in the game\'s blue array', () => {
      const card = {codename: 'B', team: null};
      component.reveal(card);
      expect(card.team).toBe(CodenameTeam.blue);
    });

    it('should give a card a assassin team designation on reveal if it is the game\'s assassin property', () => {
      const card = {codename: 'C', team: null};
      component.reveal(card);
      expect(card.team).toBe(CodenameTeam.assassin);
    });

    it('should give a card a bystander team designation on reveal if it is the game\'s assassin property', () => {
      const card = {codename: 'D', team: null};
      component.reveal(card);
      expect(card.team).toBe(CodenameTeam.bystander);
    });
  });

  describe('victory', () => {
    let largerGame;

    beforeEach(() => {
      largerGame = {
        firstTeam: CodenameTeam.blue,
        selection: ['A', 'AA', 'B', 'BB', 'C', 'D'],
        reds: ['A', 'AA'],
        blues: ['B', 'BB'],
        assassin: 'C'
      };

      component.game = largerGame;
      fixture.detectChanges();
      component.ngOnChanges({game: new SimpleChange(null, largerGame, false)});
      fixture.detectChanges();
    });

    it('should not emit a gameOver if no conditions are met', () => {
      let winner = '';
      fixture.componentInstance.gameOver.subscribe((x: string) => winner = x);
      component.reveal({codename: 'A', team: null});

      expect(winner).toEqual('');
    });

    it('should emit a gameOver if all blue words are picked with BLUE as the winner', () => {
      let winner = '';

      fixture.componentInstance.gameOver.subscribe((x: string) => winner = x);
      component.reveal({codename: 'B', team: null});
      component.reveal({codename: 'BB', team: null});
      expect(winner).toEqual(CodenameTeam.blue);
    });

    it('should emit a gameOver if all red words are picked with RED as the winner', () => {
      let winner = '';

      fixture.componentInstance.gameOver.subscribe((x: string) => winner = x);

      component.reveal({codename: 'A', team: null});
      component.reveal({codename: 'AA', team: null});
      expect(winner).toEqual(CodenameTeam.red);
    });
  });
});
