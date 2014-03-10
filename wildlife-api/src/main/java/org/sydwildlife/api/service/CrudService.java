package org.sydwildlife.api.service;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.sydwildlife.api.domain.Identifiable;

public interface CrudService<T extends Identifiable<ID>, ID extends Serializable> {

   /**
    * Saves a given entity. Use the returned instance for further operations as the save operation
    * might have changed the entity instance completely.
    * 
    * @param entity
    * @return the saved entity
    */
   T save(T entity);

   /**
    * Retrieves an entity by its id.
    * 
    * @param id
    *        must not be {@literal null}.
    * @return the entity with the given id or {@literal null} if none found
    * @throws IllegalArgumentException
    *         if {@code id} is {@literal null}
    */
   T findOne(ID id);

   /**
    * Returns a {@link Page} of entities meeting the paging restriction provided in the
    * {@code Pageable} object.
    * 
    * @param pageable
    * @return a page of entities
    */
   Page<T> findAll(Pageable pageable);

   /**
    * Returns the number of entities available.
    * 
    * @return the number of entities
    */
   long count();

   /**
    * Deletes the entity with the given id.
    * 
    * @param id
    *        must not be {@literal null}.
    * @throws IllegalArgumentException
    *         in case the given {@code id} is {@literal null}
    */
   void delete(ID id);

   /**
    * Deletes a given entity.
    * 
    * @param entity
    * @throws IllegalArgumentException
    *         in case the given entity is (@literal null}.
    */
   void delete(T entity);

   /**
    * Deletes all entities managed by the repository.
    */
   void deleteAll();
}
