import { Injectable } from '@angular/core';
import {AbstractService} from "../shared/abstract.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
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
      map((posts: any[]) =>
        posts.map(post => ({
          ...post,
          publicationDate: new Date(post.publicationDate).toISOString(), // Garante formato ISO
          images: post.images || [] // Garante lista vazia se não houver imagens
        }))
      )
    );
  }

  createPost(data: any): Observable<any> {
    console.log(data)
    return this.httpService.post(this.url, data);
  }
}
