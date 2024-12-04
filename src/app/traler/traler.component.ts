import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-traler',
  templateUrl: './traler.component.html',
  styleUrl: './traler.component.css'
})
export class TralerComponent {
  movies: any[] = [];
  movieVideos: any[] = [];
  isModalOpen: boolean=false;
  officialTrailer: any;
  selectedMovieId: string | undefined;
  movieid: any;
  sanitizedTrailerUrl: SafeResourceUrl | null = null;
  constructor(private tmdbService: MoviesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetchMovie();
   
  }



  backgroundImage: string = '';

  // Triggered on hover

  updateBackground(backdropPath: string) {
    this.backgroundImage = `https://image.tmdb.org/t/p/original/${backdropPath}`;
  }

  // Reset on leave

  resetBackground() {
    this.backgroundImage = 'https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces/ypYVX2NEm0F3HVXlqwvkwMVsW2R.jpg';
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

  fetchTV() {
    this.tmdbService.getTVDetails().subscribe(
      (data) => {
        this.movies = data.results;
        console.log('Movie popular Details:', data);
      },
      (error) => console.error(error)
    );
  }

  fetchMovieVideos() {
    this.tmdbService.getMovieVideos(this.movieid).subscribe(
      (data) => {

        console.log('vedio',data);
        this.movieVideos = data.results;
        this.findOfficialTrailer();
      },
      (error) => console.error(error)
    );
  }
  findOfficialTrailer(): void {
    if (Array.isArray(this.movieVideos)) {
      this.officialTrailer = this.movieVideos.find((trailer) => trailer.name === 'Official Trailer');
      console.log('Official Trailer:', this.officialTrailer);
    } else {
      console.error('Error: movieVideos is not an array');
    }
  }

  // Open the trailer modal
  openTrailerModal(movieId: any): void {
    // Your logic to fetch movie data (trailer) here
    this.tmdbService.getMovieVideos(movieId).subscribe(
      (data) => {

        console.log('vedio',data);
        this.movieVideos = data.results;

        const trailer = this.movieVideos.find(trailer => trailer.name === 'Official Trailer');

        if (trailer) {
          this.officialTrailer = trailer;
          // Use DomSanitizer to mark the URL as safe
          this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}`);
          this.isModalOpen = true;
        } else {
          console.error('Official trailer not found');
        }
        // this.findOfficialTrailer();
      },
      (error) => console.error(error)
    );


  }

  openTVTrailerModal(movieId: any): void {
    // Your logic to fetch movie data (trailer) here
    this.tmdbService.getTvVideos(movieId).subscribe(
      (data) => {

        console.log('vedio',data);
        this.movieVideos = data.results;

        const trailer = this.movieVideos.find(trailer => trailer.name === 'Official Trailer');

        if (trailer) {
          this.officialTrailer = trailer;
          // Use DomSanitizer to mark the URL as safe
          this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}`);
          this.isModalOpen = true;
        } else {
          console.error('Official trailer not found');
        }
        // this.findOfficialTrailer();
      },
      (error) => console.error(error)
    );


  }

  // Fetch official trailer for the selected movie
  fetchTrailer(movieId: any): void {
    this.tmdbService.getMovieVideos(movieId).subscribe((response: any) => {
      console.log('response', response);
      // Find the official trailer
      this.officialTrailer = response.results.find((video: any) => video.type === 'Trailer' && video.name === 'Official Trailer');
      console.log('Found trailer:', this.officialTrailer);
    });
  }

  // Close the trailer modal
  closeTrailerModal(): void {
    this.isModalOpen = false;
    this.sanitizedTrailerUrl = null;
  }
}

