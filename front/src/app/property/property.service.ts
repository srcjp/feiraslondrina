import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environmet/environment';
import { Observable, map } from 'rxjs';

export interface PropertyListing {
  id?: number;
  status: string;
  title?: string;
  subtitle?: string;
  propertyType?: string;
  price?: number;
  condoFee?: number;
  reference?: string;
  realtor?: string;
  bedrooms?: number;
  suites?: number;
  bathrooms?: number;
  garages?: number;
  areaUtil?: number;
  areaTotal?: number;
  description?: string;
  propertyItems?: string[];
  buildingItems?: string[];
  neighborhood?: string;
  street?: string;
  neighborhoodDescription?: string;
  observation?: string;
  phone?: string;
  name?: string;
  date?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  deleted?: boolean;
}

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private api = environment.apiUrl + '/properties';
  private filesBase = environment.apiUrl.replace('/api/v1', '') + '/';
  constructor(private http: HttpClient) {}

  private get authOptions() {
    const token = localStorage.getItem('accessToken');
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  list(): Observable<PropertyListing[]> {
    return this.http.get<PropertyListing[]>(this.api).pipe(
      map(properties => this.mapImages(properties))
    );
  }

  myList(): Observable<PropertyListing[]> {
    return this.http.get<PropertyListing[]>(this.api + '/my', this.authOptions).pipe(
      map(properties => this.mapImages(properties))
    );
  }

  create(data: FormData): Observable<PropertyListing> {
    return this.http.post<PropertyListing>(this.api, data, this.authOptions).pipe(
      map(p => this.mapImages(p))
    );
  }

  update(id: number, data: FormData): Observable<PropertyListing> {
    return this.http.put<PropertyListing>(`${this.api}/${id}`, data, this.authOptions).pipe(
      map(p => this.mapImages(p))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`, this.authOptions);
  }

  get(id: number): Observable<PropertyListing> {
    return this.http.get<PropertyListing>(`${this.api}/${id}`).pipe(
      map(p => this.mapImages(p))
    );
  }

  private mapImages<T extends PropertyListing | PropertyListing[]>(data: T): T {
    const mapFn = (p: PropertyListing) => {
      if (p.images) {
        p.images = p.images.map(img => this.filesBase + img);
      }
      return p;
    };
    if (Array.isArray(data)) {
      return data.map(mapFn) as T;
    }
    return mapFn(data) as T;
  }
}
