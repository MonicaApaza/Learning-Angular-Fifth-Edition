import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private message: BehaviorSubject<string> = new BehaviorSubject<string>('Hello from DataService!');

  constructor(private http: HttpClient) { }

  getPost() :Observable<Post> {
    return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
  }

  getMessageSubject():Observable<string> {
    return this.message.asObservable();
  }

  set editMessage(newMessage: string) {
    this.message.next(newMessage);
  }
}
