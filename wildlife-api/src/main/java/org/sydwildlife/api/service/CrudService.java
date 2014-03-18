package org.sydwildlife.api.service;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.sydwildlife.api.domain.common.Identifiable;

public interface CrudService<Entity extends Identifiable<Id>, Id extends Serializable> {

   /**
    * Saves a given entity. Use the returned instance for further operations as the save operation
    * might have changed the entity instance completely.
    * 
    * @param entity
    * @return the saved entity
    */
   Entity save(Entity entity);

   /**
    * Retrieves an entity by its id.
    * 
    * @param id
    *        must not be {@literal null}.
    * @return the entity with the given id or {@literal null} if none found
    * @throws IllegalArgumentException
    *         if {@code id} is {@literal null}
    */
   Entity findOne(Id id);

   /**
    * Returns a {@link Page} of entities meeting the paging restriction provided in the
    * {@code Pageable} object.
    * 
    * @param pageable
    * @return a page of entities
    */
   Page<Entity> findAll(Pageable pageable);

   /**
    * Deletes the entity with the given id.
    * 
    * @param id
    *        must not be {@literal null}.
    * @throws IllegalArgumentException
    *         in case the given {@code id} is {@literal null}
    */
   void delete(Id id);

   /**
    * Deletes a given entity.
    * 
    * @param entity
    * @throws IllegalArgumentException
    *         in case the given entity is (@literal null}.
    */
   void delete(Entity entity);

}
