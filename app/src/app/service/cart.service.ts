import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../model/orders';

const API_URL = 'http://localhost:8080/api/v1/orders';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClien: HttpClient) { }

  getAllOrdersByCutomerID(id: number) :Observable<Orders[]> {
    return this.httpClien.get<Orders[]>(API_URL + '/cus/' + id );
  }


  getAllCustomerHasOrder():Observable<any[]> {
    return this.httpClien.get<any[]>('http://localhost:8080/api/v1/customers/orders');
  }


  updateQuantity(orderDetailId: number, quantity: number): Observable<any> {
      return this.httpClien.put<any>(API_URL + `/update/od/${orderDetailId}/${quantity}`, {})
  }

  deleteOrdersDetail(orderDetailId: number): Observable<any> {
    return this.httpClien.delete<any>(API_URL + `/od/${orderDetailId}`);
  }
}
