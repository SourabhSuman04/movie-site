import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
  movies: any[] = [];
  constructor(private tmdbService: MoviesService) {}

  ngOnInit(): void {
    this.fetchMovie();
  }

  fetchMovie() {
    this.tmdbService.getTrendingMovieDetails().subscribe(
      (data) => {
        this.movies = data.results;
        console.log('Movie popular Details:', data);
      },
      (error) => console.error(error)
    );
  }

logVALUE(value: any): void {
  console.log('Value:', value);
this.tmdbService.sendValue(value);
}
}