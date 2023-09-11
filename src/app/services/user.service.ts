import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  updateUser(data: any) {
    return this.http.post<any>(`${this.apiUrl}/user/update`, data, this.headers);
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
