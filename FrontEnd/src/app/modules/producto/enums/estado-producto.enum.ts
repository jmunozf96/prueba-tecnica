export enum EstadoProducto {
  ACTIVO = 1,
  INACTIVO
}

export function parseEstadoProducto(estado: EstadoProducto) {
  if (estado == EstadoProducto.ACTIVO) return 'ACTIVO';
  else return 'INACTIVO';
}
