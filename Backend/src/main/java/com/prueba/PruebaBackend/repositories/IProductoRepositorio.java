package com.prueba.PruebaBackend.repositories;

import com.prueba.PruebaBackend.models.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IProductoRepositorio extends MongoRepository<Producto, String> {
}
