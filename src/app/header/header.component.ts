import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent {
  images: string[] = [
    '/../Movie-site/src/app/assets/spider.jpg',
    '/../Movie-site/src/app/assets/logo.png',
    'assets/spider.jpg'
  ];

  search:string='';

  backgroundImageUrl : string | undefined;

  constructor(private tmdbService: MoviesService,private router:Router) { }
  ngOnInit() {
  }

  handleClick(): void {
    if (this.search.trim()) {
      // Navigate to the SearchComponent with query parameters
      this.router.navigate(['/search'], { queryParams: { query: this.search } });
    } else {
      console.warn('Search field is empty');
    }
  }

  
}
