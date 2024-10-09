import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent {
  alunos = [
    { id: 1, nome: 'João', idade: 20, email: 'joao@example.com', nascimento: '2003-01-01' },
    { id: 2, nome: 'Maria', idade: 22, email: 'maria@example.com', nascimento: '2001-02-02' },
    // Adicione mais alunos conforme necessário
  ];

  constructor(private router: Router) {}

  selectAluno(aluno: any) {
    this.router.navigate(['/aluno', aluno.id]);
  }
}
