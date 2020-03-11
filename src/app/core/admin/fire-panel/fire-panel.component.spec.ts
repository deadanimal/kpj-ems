import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirePanelComponent } from './fire-panel.component';

describe('FirePanelComponent', () => {
  let component: FirePanelComponent;
  let fixture: ComponentFixture<FirePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
