import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environmet/environment';
import { Observable } from 'rxjs';

export interface Fair {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  description?: string;
  schedule?: string;
  socialMedia?: string;
  attractions?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class FairService {
  private api = environment.apiUrl + '/fairs';

  constructor(private http: HttpClient) {}

  private get authOptions() {
    const token = localStorage.getItem('accessToken');
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }

  list(): Observable<Fair[]> {
    return this.http.get<Fair[]>(this.api);
  }

  myList(): Observable<Fair[]> {
    return this.http.get<Fair[]>(this.api + '/my', this.authOptions);
  }

  create(data: Fair): Observable<Fair> {
    return this.http.post<Fair>(this.api, data, this.authOptions);
  }

  update(id: number, data: Fair): Observable<Fair> {
    return this.http.put<Fair>(`${this.api}/${id}`, data, this.authOptions);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`, this.authOptions);
  }

  get(id: number): Observable<Fair> {
    return this.http.get<Fair>(`${this.api}/${id}`);
  }
}
