import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';

  onSearch() {
    console.log('Pesquisa realizada por:', this.searchQuery);
    
  }
}

