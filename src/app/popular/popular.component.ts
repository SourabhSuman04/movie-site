import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-popular',
    templateUrl: './popular.component.html',
    styleUrl: './popular.component.css',
    standalone: false
})
export class PopularComponent {

  movies: any[] = [];
  constructor(private tmdbService: MoviesService,private router:Router) {}

  ngOnInit(): void {
    this.fetchMovie();
  }

  fetchMovie() {
    this.tmdbService.getPopularMovieDetails().subscribe(
      (data) => {
        this.movies = data.results;
        console.log('Movie popular page 2 Details:', data);
      },
      (error) => console.error(error)
    );
  }

  fetchTV() {
    this.tmdbService.getTVDetails().subscribe(
      (data) => {
        this.movies = data.results;
        console.log('Movie popular Details:', data);
      },
      (error) => console.error(error)
    );
  }
  searchMovie() {
    this.tmdbService.searchMovies('Inception').subscribe(
      (data) => {
        console.log('Search Results:', data.results);
      },
      (error) => console.error(error)
    );
  }
  viewMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
