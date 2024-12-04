import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
  movies: any[] = [];
  tv:any[] = [];
  category: any;
  constructor(private tmdbService: MoviesService,  private route: ActivatedRoute) {}


  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.category = params['category'];
    //   this.fetchMovies();
    //   // this.fetchTV();
    // });

      this.route.params.subscribe(params => {
        this.category = params['category'];
        if (this.isMovieCategory(this.category)) {
          this.fetchMovies();
        } else {
          this.fetchTV();
        }
      });
  }

  fetchMovies(): void {
    this.tmdbService
    .getMovies(this.category).subscribe({
      next: (response: any) => {
        console.log('moviwo', response)
        this.movies = response.results;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  fetchTV(): void {
    this.tmdbService
    .getTV(this.category).subscribe({
      next: (response: any) => {
        console.log('tv:', response)
        this.movies = response.results;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
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

  logVALUE(): void {
    console.log('Value:', this.counter);
  this.tmdbService.getMovies(this.category,this.counter).subscribe(
    (data) => {
      this.movies = data.results;
      console.log('Movie popular Details:', data);
    },
    (error) => console.error(error)
  );

  this.tmdbService.getTV(this.category,this.counter).subscribe(
    (data) => {
      this.movies = data.results;
      console.log('Movie popular Details:', data);
    },
    (error) => console.error(error)
  );
}

isMovieCategory(category: string): boolean {
  // Define movie categories
  const movieCategories = ['popular', 'now_playing', 'upcoming', 'top_rated'];
  return movieCategories.includes(category);
}
  }

