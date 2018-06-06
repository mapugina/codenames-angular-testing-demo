import {TestBed, inject} from '@angular/core/testing';

import {CodenamesRestService} from './codenames-rest.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {ICodeNameGameData} from './icode-name-game-data';
import {CodenameTeam} from './codename-team.enum';

describe('CodenamesRestService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let codenamesRestService: CodenamesRestService;
  const NEW_GAME_URL = 'codenames/game';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CodenamesRestService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    codenamesRestService = TestBed.get(CodenamesRestService);
  });

  it('should be created', inject([CodenamesRestService], (service: CodenamesRestService) => {
    expect(service).toBeTruthy();
  }));

  describe('#newGame', () => {
    let testGame: ICodeNameGameData;

    beforeEach(() => {
      testGame = {
        'firstTeam': CodenameTeam.blue,
        'assassin': 'OLIVE',
        'selection': [
          'CRANE',
          'BATTERY',
          'BOOT',
          'PARK',
          'NET',
          'NINJA',
          'BOARD',
          'GREEN',
          'ALIEN',
          'COOK',
          'FAN',
          'MINE',
          'WASHER',
          'TRIANGLE',
          'FLY',
          'FOOT',
          'WALL',
          'TAIL',
          'LAP',
          'PIN',
          'HORSE',
          'RAY',
          'OLIVE',
          'ALPS',
          'SATELLITE'
        ],
        'reds': [
          'SHOT',
          'BOOT',
          'LEPRECHAUN',
          'PILOT',
          'FIGURE',
          'WHIP',
          'PLATE',
          'NOVEL'
        ],
        'blues': [
          'TRIANGLE',
          'GREEN',
          'FLY',
          'FOOT',
          'ALPS',
          'NET',
          'HORSE',
          'ALIEN',
          'PARK'
        ]
      };
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should request a new game from the backend', () => {
      // Expect the data to be the right shape
      codenamesRestService.newGame().subscribe(data => {
        expect(data).toBe(testGame as any);
      });

      // Expect a single call
      const req = httpTestingController.expectOne(NEW_GAME_URL);

      // Expect the call to have been a POST
      expect(req.request.method).toEqual('POST');

      req.flush(testGame);
    });
  });
});
