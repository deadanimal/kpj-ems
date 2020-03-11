import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue-ui',
  templateUrl: './queue-ui.component.html',
  styleUrls: ['./queue-ui.component.scss']
})
export class QueueUiComponent implements OnInit {

  images = ['landing-1', 'landing-2', 'landing-3'].map((n) => `../../../assets/img/theme/${n}.png`);

  constructor() { }

  ngOnInit() {
  }

}
