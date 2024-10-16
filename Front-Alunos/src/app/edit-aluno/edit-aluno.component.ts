import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlunosService } from './../services/alunos.service';
import { IAluno } from '../models/IAluno';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-aluno',
  templateUrl: './edit-aluno.component.html',
  styleUrls: ['./edit-aluno.component.css'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [AlunosService],
})
export class EditAlunoComponent implements OnInit {
  alunoForm: FormGroup;
  aluno: IAluno | undefined;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private alunosService: AlunosService
  ) {
    this.alunoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      school: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alunosService.getAluno(Number(id)).subscribe((aluno: IAluno) => {
        this.aluno = aluno;
        this.alunoForm.patchValue(aluno);
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.alunoForm.valid) {
      const updatedAluno = { ...this.aluno, ...this.alunoForm.value };
      this.alunosService
        .updateAluno(Number(updatedAluno.id), updatedAluno)
        .subscribe(() => {
          if (this.selectedFile) {
            this.alunosService
              .uploadImage(Number(updatedAluno.id), this.selectedFile)
              .subscribe(() => {
                this.alunoForm.reset();
                this.router.navigate(['/details', updatedAluno.id]);
              });
          } else {
            this.alunoForm.reset();
            this.router.navigate(['/details', updatedAluno.id]);
          }
        });
    }
  }
}
