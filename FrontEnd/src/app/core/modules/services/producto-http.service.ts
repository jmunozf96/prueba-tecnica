import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Producto} from "../../../modules/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoHttpService {
  private api = `${environment.apiUrl}/api/producto`;

  constructor(private http: HttpClient) {
  }

  public all(): Observable<Producto[]> {
    const url = `${this.api}/all`;
    return this.http.get<Producto[]>(url);
  }

  public save(producto: Producto): Observable<Producto> {
    const url = `${this.api}/save`;
    return this.http.post<Producto>(url, producto.toJson());
  }

  public update(producto: Producto): Observable<Producto> {
    const url = `${this.api}/update/${producto.id}`;
    return this.http.put<Producto>(url, producto.toUpdate());
  }

  public delete(producto: Producto): Observable<any> {
    const url = `${this.api}/delete/${producto.id}`;
    return this.http.delete<any>(url);
  }

}
