import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aluno-detail',
  templateUrl: './aluno-detail.component.html',
  styleUrls: ['./aluno-detail.component.css']
})
export class AlunoDetailComponent implements OnInit {
  alunoId: number | undefined; 
  aluno: any; 

  constructor(private route: ActivatedRoute, private alunoService: AlunoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.alunoId = id ? +id : undefined; 
    if (this.alunoId !== undefined) {
      this.getAlunoDetail(this.alunoId);
    }
  }

  getAlunoDetail(id: number): void {
    this.aluno = this.alunoService.getAlunoById(id); 
  }
}
