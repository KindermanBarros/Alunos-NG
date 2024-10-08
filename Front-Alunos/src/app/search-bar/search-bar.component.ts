import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class SearchBarComponent {
  searchQuery = '';

  onSearch() {
    console.log('Pesquisa realizada por:', this.searchQuery);
  }
}
