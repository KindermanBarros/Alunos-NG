import { AlunosService } from './../services/alunos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IAluno } from '../models/IAluno';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.css'],
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [AlunosService],
})
export class AlunoDetailComponent implements OnInit {
  aluno: IAluno | undefined;
  imageUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService
  ) {}

  ngOnInit(): void {
    this.loadAluno();
  }

  private loadAluno(): void {
    const navigation = this.router.getCurrentNavigation();
    this.aluno = navigation?.extras.state?.['aluno'];

    if (this.aluno) {
      this.handleAluno(this.aluno);
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.fetchAluno(Number(id));
      } else {
        console.error('Aluno não encontrado');
      }
    }
  }

  private handleAluno(aluno: IAluno): void {
    if (aluno.id !== undefined) {
      this.fetchImage(aluno.id);
    } else {
      console.error('Aluno não encontrado');
    }
  }

  private fetchAluno(id: number): void {
    this.alunosService.getAluno(id).subscribe((aluno: IAluno) => {
      this.aluno = aluno;
      this.handleAluno(aluno);
    });
  }

  private fetchImage(id: number): void {
    this.alunosService.getUserImage(id).subscribe((response) => {
      this.imageUrl = `data:image/jpeg;base64,${response.image}`;
    });
  }
}
