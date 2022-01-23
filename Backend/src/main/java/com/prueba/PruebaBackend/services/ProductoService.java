package com.prueba.PruebaBackend.services;

import com.prueba.PruebaBackend.models.Producto;
import com.prueba.PruebaBackend.repositories.IProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService implements IProductoService {

    @Autowired
    private IProductoRepositorio repositorio;

    @Override
    public Producto save(Producto model) {
        model.setEstado(true);
        return repositorio.save(model);
    }

    @Override
    public Producto update(Producto model, String id) {
        Producto producto = get(id);
        if (producto != null) {
            //model.setEstado(producto.isEstado());
            model.setId(producto.getId());
            return repositorio.save(model);
        }
        return null;
    }

    @Override
    public Producto delete(String id) {
        Producto producto = get(id);
        if (producto != null) {
            producto.setEstado(false);
            return repositorio.save(producto);
        }
        return null;
    }

    @Override
    public Producto get(String id) {
        Optional<Producto> producto = repositorio.findById(id);
        return producto.orElse(null);
    }

    @Override
    @Cacheable("productos")
    public List<Producto> getAll() {
        return new ArrayList<>(repositorio.findAll());
    }
}
