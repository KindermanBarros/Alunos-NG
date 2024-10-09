import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AlunosService } from '../services/alunos.service';
import { IAluno } from '../models/IAluno';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [AlunosService],
})
export class ListComponent implements OnInit {
  showModal = false;
  form: FormGroup;
  dataSource: IAluno[] = [];
  filteredDataSource: IAluno[] = [];
  userImage: string | null = null;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onSearch() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private alunosService: AlunosService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      school: ['', Validators.required],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.alunosService.getAlunos().subscribe((data: IAluno[]) => {
      this.dataSource = data;
      this.filteredDataSource = data;
    });
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDataSource = this.dataSource.filter((element) =>
      element.name?.toLowerCase().includes(filterValue)
    );
  }

  viewElement(element: IAluno): void {
    this.router.navigate(['/details', element.id], {
      state: { aluno: element },
    });
  }

  editElement(element: IAluno): void {
    this.router.navigate(['/edit', element.id], {
      state: { aluno: element },
    });
  }

  deleteElement(element: IAluno): void {
    console.log('Delete element:', element);
    const apagarId = element.id ? element.id : 0;
    this.alunosService.deleteAluno(apagarId).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter((e) => e.id !== element.id);
        this.filteredDataSource = this.filteredDataSource.filter(
          (e) => e.id !== element.id
        );
        console.log('Element deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting element:', error);
      },
      complete: () => {
        console.log('Deletion process completed');
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.warn('Form is invalid');
      return;
    }

    const name = this.form.get('name')?.value;
    const email = this.form.get('email')?.value;
    const school = this.form.get('school')?.value;
    const imageControl = this.form.get('image');
    const imageFile =
      imageControl?.value instanceof FileList ? imageControl.value[0] : null;
    let userId: number;

    console.log('Form Values:', { name, email, school });

    this.alunosService.createAluno({ name, email, school }).subscribe({
      next: (response) => {
        userId = response.id ? response.id : 0;
        console.log('User created successfully with ID:', userId);

        const sanitizedFile = imageFile ? imageFile : new File([], 'empty');

        if (response.id === 0) {
          console.error('Error adding Image');
          return;
        }

        this.alunosService.uploadImage(userId, sanitizedFile).subscribe({
          next: (uploadResponse) => {
            console.log('Image uploaded successfully', uploadResponse);
          },
          error: (uploadError) => {
            console.error('Error uploading image', uploadError);
          },
        });
      },
      error: (error) => {
        console.error('Error creating user', error);
      },
    });
  }

  editBtn = 'Editar';
  openBtn = 'Visualizar';
  deleteBtn = 'Apagar';
}
