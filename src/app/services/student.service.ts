import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getGrade() {
    return this.http.get<any>(`${this.apiUrl}/student/grade`, this.headers);
  }

  private get headers() {
    const token = localStorage.getItem('token') || '';
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}
