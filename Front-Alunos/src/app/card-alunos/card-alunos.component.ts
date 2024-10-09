import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe o CommonModule para o ngFor

@Component({
  selector: 'app-card-alunos',
  standalone: true,
  imports: [CommonModule], // Adicione o CommonModule para habilitar o *ngFor
  templateUrl: './card-alunos.component.html',
  styleUrls: ['./card-alunos.component.css']
})
export class CardAlunosComponent {
  alunos = [
    { id: 1, nome: 'Sandra Isabela', idade: 21, curso: 'MotoAcademy' },
    { id: 2, nome: 'Pedro Henrique', idade: 23, curso: 'TechMaster' },
    { id: 3, nome: 'Ana Clara', idade: 20, curso: 'DevPro' },
    { id: 4, nome: 'João Vitor', idade: 22, curso: 'MotoAcademy' }
  ];

  // Método para capturar o clique e exibir o ID do aluno
  onButtonClick(id: number) {
    console.log(`Botão clicado para o aluno com ID: ${id}`);
  }
}
