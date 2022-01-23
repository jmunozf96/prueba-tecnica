package com.prueba.PruebaBackend.controllers;

import com.prueba.PruebaBackend.models.Producto;
import com.prueba.PruebaBackend.services.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/producto")
@CrossOrigin("*")
public class ProductoController {
    @Autowired
    private IProductoService service;

    @GetMapping(value = "/all")
    public List<Producto> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/{id}")
    public Producto getProduct(@PathVariable String id) {
        return service.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Producto> save(@RequestBody Producto producto) {
        Producto newProducto = service.save(producto);
        return new ResponseEntity<>(newProducto, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Producto> update(@RequestBody Producto producto, @PathVariable String id) {
        Producto updateProducto = service.update(producto, id);
        if (updateProducto != null) return new ResponseEntity<>(updateProducto, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Producto> delete(@PathVariable String id) {
        Producto producto = service.delete(id);
        if (producto != null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

}
