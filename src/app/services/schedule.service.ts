import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl: string = environment.apiUrl;
  private jwthelper: any = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) {}

  getSchedule(sort: string = 'id', order: number = 1, page: number = 0, page_size: number = 25) {
    return this.http.get<any>(`${this.apiUrl}/schedule?sort=${sort}&order=${order}&page=${page}&page_size=${page_size}`, this.headers);
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
