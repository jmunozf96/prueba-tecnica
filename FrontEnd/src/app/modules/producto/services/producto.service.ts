import {Injectable} from '@angular/core';
import {ProductoHttpService} from "../../../core/modules/services/producto-http.service";
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {Producto} from "../models/Producto.model";
import {catchError, finalize, map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private _products$: BehaviorSubject<Producto[]>;
  private products: Producto[];

  private _loading$: Subject<boolean>;

  constructor(private productoHttp: ProductoHttpService,
              private toastr: ToastrService) {
    this.products = [];
    this._products$ = new BehaviorSubject<Producto[]>([]);
    this._loading$ = new Subject<boolean>();
  }

  get loading$(): Subject<boolean> {
    return this._loading$;
  }

  get products$(): Observable<Producto[]> {
    return this._products$.asObservable();
  }

  init() {
    this._loading$.next(true);
    this.productoHttp.all()
      .pipe(
        map(next => {
          if (Array.isArray(next) && next.length > 0) {
            return next.map(producto => Producto.newInstance(producto));
          }
          return [];
        }),
        catchError(err => {
          return throwError(err);
        }),
        finalize(() => this._loading$.next(false))
      ).subscribe(next => {
        this.products = next;
        this._products$.next(this.products)
      },
      error => console.error(error));
  }

  saveProducto(producto: Producto) {
    this._loading$.next(true);
    this.productoHttp.save(producto)
      .pipe(
        map(next => {
          if (next) {
            const newProducto = Producto.newInstance(next);
            this.products.push(newProducto);
            this.updateListProducts();
            return true;
          }
          return false;
        }),
        catchError(err => {
          return throwError(err);
        }),
        finalize(() => this._loading$.next(false))
      )
      .subscribe(next => {
        if (next) this.toastr.success('Producto agregado con éxito');
      }, error => console.error(error))
  }

  updateProduct(producto: Producto) {
    this._loading$.next(true);
    this.productoHttp.update(producto)
      .pipe(
        map(next => {
          if (next) {
            this.products = this.products.map(product => {
              if (product.id === producto.id) product = Producto.newInstance(next);
              return product;
            });
            this.updateListProducts();
            return true;
          }
          return false;
        }),
        catchError(err => {
          return throwError(err);
        }),
        finalize(() => this._loading$.next(false))
      )
      .subscribe(next => {
        if (next) this.toastr.success('Producto actualizado con éxito');
      }, error => console.error(error))
  }

  deleteProduct(producto: Producto) {
    this._loading$.next(true);
    this.productoHttp.delete(producto)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        finalize(() => this._loading$.next(false))
      )
      .subscribe(_ => {
        this.init();
      }, error => console.error(error))
  }

  private updateListProducts() {
    this._products$.next(this.products);
  }

}
