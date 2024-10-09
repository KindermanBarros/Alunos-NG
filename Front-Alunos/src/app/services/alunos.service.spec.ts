import { TestBed } from '@angular/core/testing';

import { AlunoService } from './alunos.service';

describe('AlunosService', () => {
  let service: AlunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
