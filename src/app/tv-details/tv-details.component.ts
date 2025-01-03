import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MoviesService } from '../movies.service';

@Component({
    selector: 'app-tv-details',
    templateUrl: './tv-details.component.html',
    styleUrl: './tv-details.component.css',
    standalone: false
})
export class TvDetailsComponent {

  movies: any;
  similarMovies: any[] = [];
  movieReviews: any[] = [];
  movieVideos: any[] = [];
  movieId: number;
  credits: any[]=[];
  backgroundImage: string = '';
  officialTrailer: any; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService,
    private sanitizer: DomSanitizer
  ) {
    this.movieId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

    // this.route.paramMap.subscribe((params) => {
    //   this.movieId = Number(params.get('id'));
    //   if (this.movieId) {
    //     this.fetchMovieDetails();
    //   }
    // });
    if (this.movieId) {
      this.fetchMovieDetails();
      this.fetchSimilarMovies();
      this.fetchMovieDetailsCredits();
      this.fetchMovieReviews();
      this.fetchMovieVideos();
    }
  }

  fetchMovieDetails() {
    this.movieService.gewtTvFulldetails(this.movieId).subscribe(
      (data) => {
        
        this.movies = data;
          this.backgroundImage = `https://image.tmdb.org/t/p/original/`;
        console.log('movie',this.movies);
      },
      (error) => console.error(error)
    );
  }
  

  fetchSimilarMovies() {
    this.movieService.getSimilarTV(this.movieId).subscribe(
      (data) => {
        console.log('similar',data)
        this.similarMovies = data.results;
      },
      (error) => console.error(error)
    );
  }

  fetchMovieDetailsCredits () {
    this.movieService.getTVCast(this.movieId).subscribe(
      (data) => {
        
        this.credits = data.cast;
        console.log('credits',this.credits)
      },
      (error) => console.error(error)
    );
  }
  fetchMovieReviews() {
    this.movieService.getMovieReviews(this.movieId).subscribe(
      (data) => {

        console.log('revew',data)
        this.movieReviews = data.results;
      },
      (error) => console.error(error)
    );
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  fetchMovieVideos() {
    this.movieService.getTvVideos(this.movieId).subscribe(
      (data) => {

        console.log('vedio',data);
        this.movieVideos = data.results;
        this.findOfficialTrailer();
      },
      (error) => console.error(error)
    );
  }

  getGenres(data: any[]): string {
    console.log(data)
    return data?.map((genre) => genre.name).join(', ') || '';
  }

  navigateToSimilarMovies() {
    this.router.navigate(['/similar'], { state: { movies: this.similarMovies } });
  }
  findOfficialTrailer(): void {
    // Check if movieVideos is an array before calling find()
    if (Array.isArray(this.movieVideos)) {
      this.officialTrailer = this.movieVideos.find((trailer) => trailer.name === 'Official Trailer');
      console.log('tra',this.officialTrailer)
    } else {
      console.error('Error: movieVideos is not an array');
    }
  }
}