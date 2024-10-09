import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';
import { AlunoService } from './aluno.service';  

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    AlunoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AlunoService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
