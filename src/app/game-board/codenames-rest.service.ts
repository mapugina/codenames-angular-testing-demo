import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICodeNameGameData} from './icode-name-game-data';

@Injectable({
  providedIn: 'root'
})
export class CodenamesRestService {
  constructor(private http: HttpClient) { }

  /**
   * @returns {Observable<ICodeNameGameData>}
   */
  public newGame() {
    return this.http.post<ICodeNameGameData>('codenames/game', null, {});
  }
}
