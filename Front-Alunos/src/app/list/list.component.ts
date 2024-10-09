import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { AlunoService } from '../services/alunos.service';
import { IAluno } from '../models/IAluno';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  displayColumns: string[] = ['id', 'email','name','school'];
  dataSource!: MatTableDataSource<IAluno>
     constructor(private alunoService: AlunoService) {}

   ngOnInit(): void {
     this.carregarAlunos();
   }

   carregarAlunos(): void {
     this.alunoService.obterAlunos().subscribe((alunos) => {
       this.dataSource = new MatTableDataSource(alunos);
     });
   }

   aplicarFiltro(event: Event): void {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

 }
