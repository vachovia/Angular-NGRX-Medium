import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from './../../../../../environments/environment'
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = this.apiUrl + url;
    return this.http.get<GetFeedResponseInterface>(fullUrl);
  }
}
