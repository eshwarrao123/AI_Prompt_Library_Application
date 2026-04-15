import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // GET /api/prompts/
    getPrompts() {
        return this.http.get(`${this.baseUrl}/prompts/`);
    }

    // GET /api/prompts/<id>/
    getPrompt(id: number) {
        return this.http.get(`${this.baseUrl}/prompts/${id}/`);
    }

    // POST /api/prompts/
    createPrompt(data: { title: string; content: string; complexity: number }) {
        return this.http.post(`${this.baseUrl}/prompts/`, data);
    }
}
