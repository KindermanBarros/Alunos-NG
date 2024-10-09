import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IAluno } from '../models/IAluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private alunosUrl = 'assets/alunos.json'

  constructor(private http: HttpClient) {}
  obterAlunos(): Observable<IAluno[]> {
    return this.http.get<IAluno[]>(this.alunosUrl).pipe(
      catchError(this.handleError<IAluno[]>('obterAlunos', []))
    );
  }

  obterAluno(id: number): Observable<IAluno | undefined>{
    return this.obterAlunos().pipe(
      map((alunos) => alunos.find((aluno)=> aluno.id === id))
    );
  }

  adicionarAluno( aluno: IAluno): Observable<IAluno> {
    return this.obterAlunos().pipe(
      map((alunos)=> {
        const novosAlunos = [ ... alunos, aluno];
        this.salvarAlunos(novosAlunos);
        return aluno;
      })
    )
  }

  atualizarAluno(aluno: IAluno): Observable<IAluno> {
    return this.obterAlunos().pipe(
      map((alunos)=> {
        const index = alunos.findIndex((a) => a.id === aluno.id );
        if(index !== -1) {
          alunos[index] = aluno;
          this.salvarAlunos(alunos);
        }
        return aluno;
      })
    )
  }

  removerAluno(id: number): Observable<boolean> {
    return this.obterAlunos().pipe(
      map((alunos) => {
        const index = alunos.findIndex((a) => a.id === id);
        if (index !== -1) {
          alunos.splice(index, 1);
          this.salvarAlunos(alunos);
          return true;
        }
        return false;
      })
    );
  }

  private salvarAlunos(alunos: IAluno[]): void {
    console.log('Alunos salvos:', alunos);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      console.error(error);
      return of(result as T);

    };
  }
}
