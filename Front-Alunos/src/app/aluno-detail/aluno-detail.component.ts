import { AlunosService } from './../services/alunos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IAluno } from '../models/IAluno';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.css'],
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [AlunosService],
})
export class AlunoDetailComponent implements OnInit {
  aluno: IAluno | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.aluno = navigation?.extras.state?.['aluno'];

    if (!this.aluno) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.alunosService.getAluno(Number(id)).subscribe((aluno: IAluno) => {
          this.aluno = aluno;
        });
      }
    }
  }
}
