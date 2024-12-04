import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrl: './searchpage.component.css'
})
export class SearchpageComponent {
  query: string = '';
  movies: any[] = []; // Store search results

  constructor(private route: ActivatedRoute, private tmdbService: MoviesService) {}

  ngOnInit(): void {
    // Get query parameter
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'] || '';
      if (this.query) {
        this.fetchSearchResults();
      }
    });
  }

  fetchSearchResults(): void {
    this.tmdbService.searchMovies(this.query).subscribe(
      (data) => {
        this.movies = data.results; // Assuming the API response has a 'results' property
        console.log('Search Results:', this.movies);
      },
      (error) => console.error('Error fetching search results:', error)
    );
  }
  counter: number = 0;

  increment(): void {
    this.counter++;
  }

  decrement(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }
}
