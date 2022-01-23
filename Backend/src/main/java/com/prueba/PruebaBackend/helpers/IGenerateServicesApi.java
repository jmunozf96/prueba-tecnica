package com.prueba.PruebaBackend.helpers;

import java.io.Serializable;
import java.util.List;

public interface IGenerateServicesApi<T, ID extends Serializable>{
    T save(T model);
    T update(T model, ID id);
    T delete(ID id);
    T get(ID id);
    List<T> getAll();
}
