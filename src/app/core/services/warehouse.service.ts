import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Warehouse } from '../models/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private baseUrl = 'http://localhost:3000/warehouses';

  constructor(private http: HttpClient) { }

  getWarehouses() {
    return this.http.get<Warehouse[]>(this.baseUrl);
  }
}
