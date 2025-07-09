import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environmet/environment';

export interface Attraction {
  id?: number;
  name: string;
  specialty?: string;
  socialMedia?: string;
}

@Injectable({ providedIn: 'root' })
export class AttractionService {
  private api = environment.apiUrl + '/attractions';

  constructor(private http: HttpClient) {}

  private get authOptions() {
    const token = localStorage.getItem('accessToken');
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }

  listByFair(fairId: number): Observable<Attraction[]> {
    return this.http.get<Attraction[]>(`${this.api}/fair/${fairId}`);
  }

  create(fairId: number, data: Attraction): Observable<Attraction> {
    return this.http.post<Attraction>(`${this.api}/fair/${fairId}`, data, this.authOptions);
  }

  update(id: number, data: Attraction): Observable<Attraction> {
    return this.http.put<Attraction>(`${this.api}/${id}`, data, this.authOptions);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`, this.authOptions);
  }

  get(id: number): Observable<Attraction> {
    return this.http.get<Attraction>(`${this.api}/${id}`);
  }
}
