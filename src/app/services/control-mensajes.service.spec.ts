import { TestBed } from '@angular/core/testing';

import { ControlMensajesService } from './control-mensajes.service';

describe('ControlErroresService', () => {
  let service: ControlMensajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlMensajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
