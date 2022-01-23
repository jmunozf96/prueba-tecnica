import {ICategoria} from "../interfaces/producto";

export class Categoria implements ICategoria {
  value: string;
  nombre: string;
  descripcion: string;

  constructor() {
    this.value = '';
    this.nombre = '';
    this.descripcion = '';
  }

  static newInstance(data: any) {
    const categoria = new Categoria();
    categoria.nombre = data['nombre'];
    categoria.descripcion = data['descripcion'];
    return categoria;
  }
}
