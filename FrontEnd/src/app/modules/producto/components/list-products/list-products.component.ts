import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ProductoService} from "../../services/producto.service";
import {Producto} from "../../models/Producto.model";
import {EstadoProducto} from "../../enums/estado-producto.enum";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalFormComponent} from "../modal-form/modal-form.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {categorias} from "../../helpers/categorias";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit, OnDestroy {

  @Output('update') updateProduct: EventEmitter<Producto> = new EventEmitter<Producto>();
  @Output('delete') deleteProduct: EventEmitter<Producto> = new EventEmitter<Producto>();

  constructor(private fb: FormBuilder,
              private productoService: ProductoService,
              private modalService: NgbModal) {
  }

  get loading$() {
    return this.productoService.loading$;
  }

  get products$() {
    return this.productoService.products$;
  }

  ngOnInit(): void {
    this.productoService.init();
  }

  badgeCategoria(producto: Producto) {
    return producto.customEstado === EstadoProducto.ACTIVO
  }

  searchCategoria(producto: Producto) {
    const categoria = categorias;
    const searchCategoria = categoria.filter(cat => cat.value === producto.categoria);
    return searchCategoria.length > 0 ?
      `${searchCategoria[0].nombre}`
      : 'No existe Categoria';
  }

  update(producto: Producto, active = false) {
    const modalRef = this.modalService.open(ModalFormComponent);
    modalRef.componentInstance.edit = true;
    modalRef.componentInstance.form = producto.formBuilder(this.fb);

    modalRef.result.then((result) => {
      if (result instanceof FormGroup) {
        const updateProducto = Producto.newInstance(result.getRawValue());
        updateProducto.estado = !active ? updateProducto.estado : active;
        this.updateProduct.emit(updateProducto);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  delete(producto: Producto) {
    this.deleteProduct.emit(producto);
  }

  active(producto: Producto) {
    const updateProducto = Producto.newInstance(producto);
    updateProducto.estado = true;
    this.updateProduct.emit(updateProducto);
  }

  ngOnDestroy(): void {
    this.updateProduct.complete();
    this.deleteProduct.complete();
  }

  isActive(estado: EstadoProducto) {
    return estado === EstadoProducto.ACTIVO;
  }
}
