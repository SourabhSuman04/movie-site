import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent {
setHoveredIndex(_t7: number) {
throw new Error('Method not implemented.');
}
  @Input() data: any[] = [];
  hoveredIndex: number | null = null;
  currentMovie: any;
  IMAGE_BASE = 'https://image.tmdb.org/t/p/original'; // Replace with your base image URL

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.data?.length) {
      this.setBackgroundImage(this.data[0]?.backdrop_path);
      this.currentMovie = this.data[0];
    }
  }

  setBackgroundImage(backdrop_path: string): void {
    const screen = document.getElementById('FullScreen');
    if (screen) {
      screen.style.backgroundImage = `url(${this.IMAGE_BASE + backdrop_path})`;
    }
  }

  navigateToMovie(movie: any): void {
    this.router.navigate(['/selected-movie', movie.id], { state: movie });
  }
}

