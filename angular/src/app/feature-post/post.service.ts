import { Injectable } from '@angular/core';
import {AbstractService} from "../shared/abstract.service";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {CreatePostPayload, Post} from "../model/post";

@Injectable({
  providedIn: 'root'
})
export class PostService extends AbstractService<any>{

  protected constructor(httpService: HttpClient) {
    super(httpService,'post');
  }
  getPosts(): Observable<Post[]> {
    return this.httpService.get<Post[]>(`${this.url}/list`).pipe(
      tap(response => console.log('API Response:', response)), // Loga a resposta para análise
      catchError(error => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error('Failed to fetch posts'));
      })
    );
  }


  createPost(formData: FormData): Observable<any> {
    return this.httpService.post(this.url, formData);
  }

  updatePost(formData: FormData, id:number): Observable<any> {
    return this.httpService.put(`${this.url}/${id}`, formData);
  }
}
