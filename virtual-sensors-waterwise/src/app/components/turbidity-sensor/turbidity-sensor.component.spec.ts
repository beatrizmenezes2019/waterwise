import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbiditySensorComponent } from './turbidity-sensor.component';

describe('TurbiditySensorComponent', () => {
  let component: TurbiditySensorComponent;
  let fixture: ComponentFixture<TurbiditySensorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurbiditySensorComponent]
    });
    fixture = TestBed.createComponent(TurbiditySensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
