import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhSensorComponent } from './ph-sensor.component';

describe('PhSensorComponent', () => {
  let component: PhSensorComponent;
  let fixture: ComponentFixture<PhSensorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhSensorComponent]
    });
    fixture = TestBed.createComponent(PhSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
