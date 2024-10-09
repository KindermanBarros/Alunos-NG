import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';

const routes: Routes = [
  { path: 'alunos', component: AlunosComponent },
  { path: 'aluno/:id', component: AlunoDetailComponent },
  { path: '', redirectTo: '/alunos', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
