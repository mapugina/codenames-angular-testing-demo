import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-codename-card',
  templateUrl: './codename-card.component.html',
  styleUrls: ['./codename-card.component.css']
})
export class CodenameCardComponent implements OnInit {

  @Input() codename: string;
  @Input() team: string;

  @Output() revealed: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  reveal() {
    if (this.team) {
      return;
    }

    this.revealed.emit(this.codename);
  }

}
