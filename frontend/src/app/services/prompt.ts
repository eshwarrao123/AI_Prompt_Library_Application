import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Optional interface to help with TypeScript typing
export interface Prompt {
  id?: number;
  title: string;
  content: string;
  complexity: number;
  created_at?: string;
  view_count?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private apiUrl = 'http://127.0.0.1:8000/api/prompts/';

  constructor(private http: HttpClient) { }

  getPrompts(): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(this.apiUrl);
  }

  getPrompt(id: number): Observable<Prompt> {
    return this.http.get<Prompt>(`${this.apiUrl}${id}/`);
  }

  createPrompt(data: Partial<Prompt>): Observable<Prompt> {
    return this.http.post<Prompt>(this.apiUrl, data);
  }
}
