package org.sydwildlife.api.controller;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.util.Assert;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.sydwildlife.api.domain.common.Identifiable;
import org.sydwildlife.api.service.CrudService;

@RestController
public abstract class AbstractCrudController<Entity extends Identifiable<Id>, Id extends Serializable> {

   protected abstract CrudService<Entity, Id> getCrudService();

   @RequestMapping(method = GET)
   public Page<Entity> get(Pageable pageable) {
      return getCrudService().findAll(pageable);
   }

   @RequestMapping(method = POST)
   public Entity post(@Validated @RequestBody Entity entity) {
      Assert.notNull(entity, "The message content shouldn't be null.");
      return getCrudService().save(entity);
   }

   @RequestMapping(value = "/{id}", method = PUT)
   public Entity putOne(@PathVariable Id id, @Validated @RequestBody Entity entity) {
      Assert.notNull(id, "The resource Identifier shouldn't be null.");
      Assert.notNull(entity, "The message content shouldn't be null.");

      entity.setId(id);
      return getCrudService().save(entity);
   }

   @RequestMapping(value = "/{id}", method = GET)
   public Entity getOne(@PathVariable Id id) {
      Assert.notNull(id, "The resource Identifier shouldn't be null.");
      return getCrudService().findOne(id);
   }

   @RequestMapping(value = "/{id}", method = DELETE)
   public void deleteOne(@PathVariable Id id) {
      Assert.notNull(id, "The resource Identifier shouldn't be null.");
      getCrudService().delete(id);
   }
}