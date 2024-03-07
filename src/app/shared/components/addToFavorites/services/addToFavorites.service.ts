import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleInterface, ArticleResponseInterface } from './../../../types';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUrl(slug: string): string {
    return `${this.apiUrl}/articles/${slug}/favorite`;
  }

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http.post<ArticleResponseInterface>(url, {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http.delete<ArticleResponseInterface>(url).pipe(map(this.getArticle));
  }

  getArticle(response: ArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
