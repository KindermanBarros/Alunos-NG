import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoDetailComponent } from './aluno-detail.component';

describe('AlunoDetailComponent', () => {
  let component: AlunoDetailComponent;
  let fixture: ComponentFixture<AlunoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
