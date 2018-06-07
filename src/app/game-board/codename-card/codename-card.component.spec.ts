import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodenameCardComponent } from './codename-card.component';
import {By} from '@angular/platform-browser';

describe('CodenameCardComponent', () => {
  let component: CodenameCardComponent;
  let fixture: ComponentFixture<CodenameCardComponent>;
  let cardDe;
  let cardEl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodenameCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodenameCardComponent);

    // find the DebugElement and element
    cardDe = fixture.debugElement.query(By.css('.codename-card'));
    cardEl = cardDe.nativeElement;

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no codename if none is given', () => {
    const nameEl = fixture.nativeElement.querySelector('.codename');
    expect(nameEl.textContent).toEqual('');
    const inverseEl = fixture.nativeElement.querySelector('.codename.codename-inverse');
    expect(inverseEl.textContent).toEqual('');
  });

  it('should render out its primary given codename', () => {
    const codename = 'Mike';
    component.codename = codename;
    fixture.detectChanges();
    const nameEl = fixture.nativeElement.querySelector('.codename');
    expect(nameEl.textContent).toEqual(codename);
  });

  it('should render out its secondary given codename', () => {
    const codename = 'Mike';
    component.codename = codename;
    fixture.detectChanges();
    const inverseEl = fixture.nativeElement.querySelector('.codename.codename-inverse');
    expect(inverseEl.textContent).toEqual(codename);
  });

  it('should reveal blue if it has a blue team designation', () => {
    component.team = 'BLUE';
    fixture.detectChanges();

    const teamEl = fixture.nativeElement.querySelector('.team-blue');

    expect(teamEl).not.toBeNull();
  });

  it('should reveal red if it has a red team designation', () => {
    component.team = 'RED';
    fixture.detectChanges();

    const teamEl = fixture.nativeElement.querySelector('.team-red');

    expect(teamEl).not.toBeNull();
  });

  it('should reveal as an assassin if it has an assassin team designation', () => {
    component.team = 'ASSASSIN';
    fixture.detectChanges();

    const teamEl = fixture.nativeElement.querySelector('.team-assassin');

    expect(teamEl).not.toBeNull();
  });

  it('should reveal as an bystander if it has an bystander team designation', () => {
    component.team = 'BYSTANDER';
    fixture.detectChanges();

    const teamEl = fixture.nativeElement.querySelector('.team-bystander');

    expect(teamEl).not.toBeNull();
  });

  it('should emit a reveal event if it is clicked and does not have a team', async () => {
    const codename = 'Mike';
    component.codename = codename;
    fixture.detectChanges();

    const front = fixture.debugElement.query(By.css('.card-front'));

    let selectedCodename = '';
    fixture.componentInstance.revealed.subscribe((x: string) => selectedCodename = x);

    front.triggerEventHandler('click', null);

    await expect(selectedCodename).toBe(codename);
  });

  it('should do nothing if clicked with a team', () => {
    const originalCodeName = 'Do not change me';
    component.codename = originalCodeName;
    component.team = 'BLUE';
    fixture.detectChanges();

    let selectedCodename = originalCodeName;
    fixture.componentInstance.revealed.subscribe(() => selectedCodename = 'changed!');

    cardDe.triggerEventHandler('click', null);

    expect(selectedCodename).toBe(originalCodeName);
  });
});
