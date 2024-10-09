import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  id: number;
  nome: string;
  idade: number;
  email: string;
  nascimento: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private apiUrl = 'sua_api_url/aqui'; 

  constructor(private http: HttpClient) {}

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  getAlunoById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }
}
