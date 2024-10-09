import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';
import { EditAlunoComponent } from './edit-aluno/edit-aluno.component';
import { ListComponent } from './list/list.component';

export const routes = [
  { path: '', component: ListComponent },
  { path: 'details/:id', component: AlunoDetailComponent },
  { path: 'edit/:id', component: EditAlunoComponent },
];
