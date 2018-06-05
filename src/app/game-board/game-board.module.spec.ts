import { GameBoardModule } from './game-board.module';
import {CodenamesRestService} from './codenames-rest.service';

describe('GameBoardModule', () => {
  let gameBoardModule: GameBoardModule;

  beforeEach(() => {
    gameBoardModule = new GameBoardModule();
  });

  it('should create an instance', () => {
    expect(gameBoardModule).toBeTruthy();
  });
});
