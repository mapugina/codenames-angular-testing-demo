import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CodenamesRestService} from './game-board/codenames-rest.service';
import {Observable} from 'rxjs';
describe('AppComponent', () => {
  let mockAPI, mockAPIReturn;
  beforeEach(async(() => {
    mockAPIReturn = {team: 'BLUE'};

    mockAPI = {newGame: () => new Observable(s => {
      s.next(mockAPIReturn);
      s.complete();
      })};

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{ provide: CodenamesRestService, useValue: mockAPI }]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
