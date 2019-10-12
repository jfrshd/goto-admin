import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) {
  }

  addPost(formData: FormData): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8000/api/posts', formData);
  }
}
