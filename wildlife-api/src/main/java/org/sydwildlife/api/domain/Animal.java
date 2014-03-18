package org.sydwildlife.api.domain;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;

import org.sydwildlife.api.domain.common.HasStatus;
import org.sydwildlife.api.domain.enumeration.Status;
import org.sydwildlife.api.persistence.common.UuidEntityBase;

@Entity
@Cacheable
public class Animal extends UuidEntityBase implements HasStatus {

   @NotNull
   @Column(length = 10, nullable = false)
   @Enumerated(EnumType.STRING)
   private Status status = Status.ACTIVE;

   public Status getStatus() {
      return status;
   }

   public void setStatus(Status status) {
      this.status = status;
   }

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
