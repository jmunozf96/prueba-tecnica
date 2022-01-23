import {Component, OnInit} from '@angular/core';
import {ProductoService} from "../../services/producto.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalFormComponent} from "../../components/modal-form/modal-form.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Producto} from "../../index";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private productoService: ProductoService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(ModalFormComponent);
    modalRef.componentInstance.form = (new Producto()).formBuilder(this.fb);
    modalRef.result.then((result) => {
      if (result instanceof FormGroup) {
        const producto = Producto.newInstance(result.getRawValue());
        this.save(producto);
      }
    }).catch(err => {
      console.log(err)
    });
  }

  private save(producto: Producto) {
    this.productoService.saveProducto(producto);
  }

  update(producto: Producto) {
    console.log('emitiendo', producto)
    this.productoService.updateProduct(producto);
  }

  delete(producto: Producto) {
    console.log(producto)
    this.productoService.deleteProduct(producto);
  }

}
