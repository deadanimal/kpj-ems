import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueUiComponent } from './queue-ui.component';

describe('QueueUiComponent', () => {
  let component: QueueUiComponent;
  let fixture: ComponentFixture<QueueUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
