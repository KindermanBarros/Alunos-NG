import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAlunosComponent } from './card-alunos.component';

describe('CardAlunosComponent', () => {
  let component: CardAlunosComponent;
  let fixture: ComponentFixture<CardAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAlunosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
