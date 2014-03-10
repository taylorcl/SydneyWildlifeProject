package org.sydwildlife.api.domain;

import javax.persistence.Cacheable;
import javax.persistence.Entity;

import org.sydwildlife.api.persistence.common.UuidEntityBase;

@Entity
@Cacheable
public class Animal extends UuidEntityBase {

   public static Builder builder() {
      return new Builder();
   }

   protected static class Builder extends UuidEntityBase.Builder<Animal> {

      @Override
      protected Animal getNewInstance() {
         return new Animal();
      }

   }

}
