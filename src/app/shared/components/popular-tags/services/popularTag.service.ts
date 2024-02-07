import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {PopularTagType} from './../../../types';
import {environment} from '../../../../../environments/environment';
import {GetPopularTagsResponseInterface} from './../types';

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = this.apiUrl + '/tags';
    return this.http.get<GetPopularTagsResponseInterface>(url).pipe(map((response) => response.tags));
  }
}
