import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductivitySensorComponent } from './conductivity-sensor.component';

describe('ConductivitySensorComponent', () => {
  let component: ConductivitySensorComponent;
  let fixture: ComponentFixture<ConductivitySensorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConductivitySensorComponent]
    });
    fixture = TestBed.createComponent(ConductivitySensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
