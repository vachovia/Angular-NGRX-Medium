import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {environment} from './../../../environments/environment';
import {ArticleInterface, ArticleResponseInterface} from '../types';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${this.apiUrl}/articles/${slug}`;
    return this.http.get<ArticleResponseInterface>(fullUrl).pipe(map((r) => r.article));
  }
}
