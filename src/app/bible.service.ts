import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BibleService {
  private API_URL = 'https://bible-api.com';

  constructor(private http: HttpClient) {}

  
  getVerse(reference: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${reference}`);
  }
}
