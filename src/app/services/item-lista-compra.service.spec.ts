import { TestBed } from '@angular/core/testing';

import { ItemListaCompraService } from './item-lista-compra.service';

describe('ItemListaCompraService', () => {
  let service: ItemListaCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemListaCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
