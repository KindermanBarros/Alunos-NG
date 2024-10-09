import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardAlunosComponent } from './card-alunos/card-alunos.component';  // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-root',  // Mantém apenas o seletor do app-root
  standalone: true,
  imports: [RouterOutlet, CardAlunosComponent],  // Inclua o CardAlunosComponent nos imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  // Corrija para styleUrls (plural)
})
export class AppComponent {
  title = 'Front-Alunos';
}
