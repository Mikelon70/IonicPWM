import { TestBed } from '@angular/core/testing';

import { SqliteCRUDService } from './sqlite-crud.service';

describe('SqliteCRUDService', () => {
  let service: SqliteCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
