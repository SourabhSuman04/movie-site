import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrendingComponent } from './trending/trending.component';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private API_KEY = '493132bae2a8018dd00443aec8aadfda';
  private ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTMxMzJiYWUyYTgwMThkZDAwNDQzYWVjOGFhZGZkYSIsIm5iZiI6MTczMTc1NjE2OS43NDg5OTYsInN1YiI6IjY3MzVmYzViNmJkNDg4OWJmYmM3NzlmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c6AvNO8E22pjK3xEZhrmFkFJ-VSvgn5m02Uza7b1_7I';
  private MOVIE_BASE = 'https://api.themoviedb.org/3/movie';
  private SEARCH_BASE = 'https://api.themoviedb.org/3/search/movie';
private trending_url = "https://api.themoviedb.org/3/trending/all/day";
private trending_url_week = "https://api.themoviedb.org/3/trending/all/week";
private values='';
private url=this.trending_url;
private TV_URL = "https://api.themoviedb.org/3/trending/tv/week";
private TV_List_URL = "https://api.themoviedb.org/3/tv"

  constructor(private http: HttpClient){
  
  }

  sendValue(value: string): void {
    // Simulate sending value (you can replace this with an HTTP call)
    this.values = value;

    this.url=(this.values=='day')?this.trending_url:this.trending_url_week;
    console.log('Value sent to service:', this.url);
    
  }
  // Fetch movie details by ID
  getPopularMovieDetails(page: number = 1): Observable<any> {
    return this.http.get(`${this.MOVIE_BASE}/popular`, {
      params: {
        api_key: this.API_KEY,
        page: page.toString(),
      },
    });
  }

  getTopRatedMovieDetails(page: number = 1): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    });

    return this.http.get(`${this.MOVIE_BASE}top_rated?api_key=${this.API_KEY}`, {
      headers,
    });
  }

  getTrendingMovieDetails(page: number = 1): Observable<any> {

console.log('Getting',this.values);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    });

    return this.http.get(`${this.url}?api_key=${this.API_KEY}`, {
      headers,
    });
  }

  getTVDetails(page: number = 1): Observable<any> {

    console.log('Getting',this.values);
        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.ACCESS_TOKEN}`,
        });
    
        return this.http.get(`${this.TV_URL}?api_key=${this.API_KEY}`, {
          headers,
        });
      }

      gewtTvFulldetails(movieId: number): Observable<any> {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.ACCESS_TOKEN}`,
        });
    
        return this.http.get(`${this.TV_List_URL}/${movieId}&api_key=${this.API_KEY}`, {
              headers,
            });
      }
  // Search for movies
  searchMovies(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    });

    return this.http.get(`${this.SEARCH_BASE}?query=${query}&api_key=${this.API_KEY}`, {
      headers,
    });
  }

  getMovieDetails(movieId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    });

    return this.http.get(`${this.MOVIE_BASE}/${movieId}&api_key=${this.API_KEY}`, {
          headers,
        });
  }

  getSimilarMovies(movieId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    });

    return this.http.get(`${this.MOVIE_BASE}/${movieId}/similar?api_key=${this.API_KEY}`, {
          headers,
        });}


        getMovieDetailsCredits(movieId: number): Observable<any> {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${this.ACCESS_TOKEN}`,
          });
      
          return this.http.get(`${this.MOVIE_BASE}/${movieId}/credits?api_key=${this.API_KEY}`, {
                headers,
              });
        }
      
  getMovieReviews(movieId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    });
    return this.http.get(`${this.MOVIE_BASE}/${movieId}/reviews?api_key=${this.API_KEY}`, {
          headers,
        });}
  
  getMovieVideos(movieId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    });
    return this.http.get(`${this.MOVIE_BASE}/${movieId}/videos?api_key=${this.API_KEY}`, {
      headers,
    });}

    getTvVideos(movieId: number): Observable<any> {
    const headers=new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    });

    return this.http.get(`${this.TV_List_URL}/${movieId}/videos?api_key=${this.API_KEY}`, {
      headers,
    });}
  
    getSimilarTV(movieId: number): Observable<any> {
    const headers=new HttpHeaders({
      Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    });
    return this.http.get(`${this.TV_List_URL}/${movieId}/similar?api_key=${this.API_KEY}`, {
      headers,
    });
  }

    getTVCast(movieId:number):Observable<any>{
      const headers=new HttpHeaders({
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
      });
      return this.http.get(`${this.TV_List_URL}/${movieId}/credits?api_key=${this.API_KEY}`, {
        headers,
      });
    }


    getMovies(category: string,page: number = 1): Observable<any> {
      const url = `${this.MOVIE_BASE}/${category}?api_key=${this.API_KEY}`;
      return this.http.get(url, {
        params: {
          api_key: this.API_KEY,
          page: page.toString(),
        },
      });
    }

    getTV(category: string,page: number = 1): Observable<any> {
      const url = `${this.TV_List_URL}/${category}?`;
      console.log('url',url)
      return this.http.get(url, {
        params: {
          api_key: this.API_KEY,
          page: page.toString(),
        },
      });
    }
}
