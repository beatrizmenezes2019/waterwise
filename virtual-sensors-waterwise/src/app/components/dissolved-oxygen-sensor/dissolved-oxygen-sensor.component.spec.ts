import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DissolvedOxygenSensorComponent } from './dissolved-oxygen-sensor.component';

describe('DissolvedOxygenSensorComponent', () => {
  let component: DissolvedOxygenSensorComponent;
  let fixture: ComponentFixture<DissolvedOxygenSensorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DissolvedOxygenSensorComponent]
    });
    fixture = TestBed.createComponent(DissolvedOxygenSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
