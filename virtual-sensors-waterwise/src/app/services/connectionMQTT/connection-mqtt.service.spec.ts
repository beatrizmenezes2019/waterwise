import { TestBed } from '@angular/core/testing';

import { ConnectionMQTTService } from './connection-mqtt.service';

describe('ConnectionMQTTService', () => {
  let service: ConnectionMQTTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionMQTTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
