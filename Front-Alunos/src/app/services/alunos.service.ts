import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAluno } from '../models/IAluno';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  private apiUrl = 'http://localhost:1337/api/usuarios';
  private uploadUrl = 'http://localhost:1337/api/upload';

  constructor(private http: HttpClient) {}

  getAlunos(): Observable<IAluno[]> {
    return this.http.get<IAluno[]>(this.apiUrl);
  }

  getAluno(id: number): Observable<IAluno> {
    return this.http.get<IAluno>(`${this.apiUrl}/${id}`);
  }

  createAluno(aluno: IAluno): Observable<IAluno> {
    const { email, name, school } = aluno;
    return this.http.post<IAluno>(this.apiUrl, { email, name, school });
  }

  deleteAluno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(id: number, file: File): Observable<unknown> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.uploadUrl}/${id}`, formData);
  }

  getUserImage(id: number): Observable<{ image: string }> {
    return this.http.get<{ image: string }>(`${this.uploadUrl}/${id}/image`);
  }

  updateAluno(id: number, aluno: IAluno): Observable<IAluno> {
    const { email, name, school } = aluno;
    return this.http.put<IAluno>(`${this.apiUrl}/${id}`, {
      email,
      name,
      school,
    });
  }
}
