package org.sydwildlife.api.service.impl;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.sydwildlife.api.domain.Identifiable;
import org.sydwildlife.api.service.CrudService;

public abstract class AbstractCrudService<T extends Identifiable<ID>, ID extends Serializable>
      implements CrudService<T, ID> {

   @Override
   public T save(T entity) {
      return getRepository().save(entity);
   }

   @Override
   public T findOne(ID id) {
      return getRepository().findOne(id);
   }

   @Override
   public Page<T> findAll(Pageable pageable) {
      return getRepository().findAll(pageable);
   }

   @Override
   public long count() {
      return getRepository().count();
   }

   @Override
   public void delete(ID id) {
      getRepository().delete(id);
   }

   @Override
   public void delete(T entity) {
      getRepository().delete(entity);
   }

   @Override
   public void deleteAll() {
      getRepository().deleteAll();
   }

   protected abstract JpaRepository<T, ID> getRepository();
}
