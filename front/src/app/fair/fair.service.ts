import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environmet/environment';
import { Observable, map } from 'rxjs';
import { Attraction } from './attraction.service';

export enum FairType {
  FESTA_JUNINA = 'FESTA_JUNINA',
  PASTEL = 'PASTEL',
  FEIRA_DA_LUA = 'FEIRA_DA_LUA',
  FEIRA_GENERICA = 'FEIRA_GENERICA'
}

export interface Fair {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  description?: string;
  schedule?: string;
  openingHours?: string;
  socialMedia?: string;
  attractions?: string;
  responsible?: string;
  phone?: string;
  type?: FairType;
  imagePath?: string;
  createdAt?: string;
  attractionList?: Attraction[];
}

@Injectable({ providedIn: 'root' })
export class FairService {
  private api = environment.apiUrl + '/fairs';
  private filesBase = environment.apiUrl.replace('/api/v1', '') + '/';

  constructor(private http: HttpClient) {}

  private get authOptions() {
    const token = localStorage.getItem('accessToken');
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }

  list(): Observable<Fair[]> {
    return this.http.get<Fair[]>(this.api).pipe(map(list => this.mapImages(list)));
  }

  myList(): Observable<Fair[]> {
    return this.http.get<Fair[]>(this.api + '/my', this.authOptions).pipe(map(list => this.mapImages(list)));
  }

  create(data: FormData): Observable<Fair> {
    return this.http.post<Fair>(this.api, data, this.authOptions).pipe(map(f => this.mapImages(f)));
  }

  update(id: number, data: FormData): Observable<Fair> {
    return this.http.put<Fair>(`${this.api}/${id}`, data, this.authOptions).pipe(map(f => this.mapImages(f)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`, this.authOptions);
  }

  get(id: number): Observable<Fair> {
    return this.http.get<Fair>(`${this.api}/${id}`).pipe(map(f => this.mapImages(f)));
  }

  private mapImages<T extends Fair | Fair[]>(data: T): T {
    const mapFn = (f: Fair) => {
      if (f.imagePath) {
        const fileName = f.imagePath.split(/[\\/]/).pop();
        f.imagePath = this.filesBase + 'file/' + fileName;
      }
      return f;
    };
    if (Array.isArray(data)) {
      return data.map(mapFn) as T;
    }
    return mapFn(data) as T;
  }
}
