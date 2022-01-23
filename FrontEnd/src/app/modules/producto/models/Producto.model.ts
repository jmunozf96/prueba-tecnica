import {EstadoProducto, parseEstadoProducto} from "../enums/estado-producto.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export class Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  estado: boolean;

  constructor() {
    this.id = 'nuevo';
    this.nombre = '';
    this.categoria = '';
    this.precio = 0;
    this.estado = true;
  }

  get customEstado(): EstadoProducto {
    return this.estado ? EstadoProducto.ACTIVO : EstadoProducto.INACTIVO;
  }

  get badgeEstado(): string {
    return parseEstadoProducto(this.customEstado);
  }

  static newInstance(producto: any) {
    const newProducto = new Producto();
    newProducto.id = producto['id'] || newProducto.id;
    newProducto.nombre = producto['nombre'];
    newProducto.categoria = producto['categoria'];
    newProducto.precio = producto['precio'];
    newProducto.estado = producto['estado'];
    return newProducto;
  }

  formBuilder(fb: FormBuilder): FormGroup {
    return fb.group({
      id: [this.id],
      nombre: [this.nombre, Validators.compose([
        Validators.required
      ])],
      categoria: [this.categoria, Validators.compose([
        Validators.required
      ])],
      precio: [this.precio, Validators.compose([
        Validators.required, Validators.min(0.01)
      ])],
      estado: [this.estado],
    })
  }

  toJson() {
    return {
      nombre: this.nombre,
      categoria: this.categoria,
      precio: this.precio
    }
  }

  toUpdate(){
    return {
      nombre: this.nombre,
      categoria: this.categoria,
      precio: this.precio,
      estado: this.estado
    }
  }
}

