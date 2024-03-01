import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${this.apiUrl}/articles/${slug}`;
    return this.http.delete(fullUrl);
  }
}
