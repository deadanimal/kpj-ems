import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureHumidityComponent } from './temperature-humidity.component';

describe('TemperatureHumidityComponent', () => {
  let component: TemperatureHumidityComponent;
  let fixture: ComponentFixture<TemperatureHumidityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureHumidityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureHumidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
