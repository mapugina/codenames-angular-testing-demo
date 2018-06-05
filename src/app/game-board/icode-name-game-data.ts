import {CodenameTeam} from './codename-team.enum';

export interface ICodeNameGameData {
  firstTeam: CodenameTeam;
  assassin: string;
  selection: string[];
  reds: string[];
  blues: string[];
}
