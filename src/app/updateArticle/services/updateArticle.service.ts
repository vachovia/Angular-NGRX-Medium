import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleInterface, ArticleRequestInterface, ArticleResponseInterface} from '../../shared/types';
import {environment} from '../../../environments/environment';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateArticleService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  updateArticle(slug: string, articleRequest: ArticleRequestInterface): Observable<ArticleInterface> {
    const fullUrl = `${this.apiUrl}/articles/${slug}`;
    return this.http.put<ArticleResponseInterface>(fullUrl, articleRequest).pipe(map((response) => response.article));
  }
}
