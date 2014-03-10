package org.sydwildlife.api.persistence.common;

import java.util.UUID;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.eclipse.persistence.annotations.Convert;
import org.eclipse.persistence.annotations.Converter;
import org.eclipse.persistence.annotations.UuidGenerator;
import org.sydwildlife.api.domain.Identifiable;
import org.sydwildlife.api.persistence.converter.UUIDConverter;

@MappedSuperclass
@UuidGenerator(name = "UUID")
@Converter(name = "uuidConverter", converterClass = UUIDConverter.class)
public abstract class UuidEntityBase extends EntityBase<UUID>
      implements Identifiable<UUID> {

   @Id
   @GeneratedValue(generator = "UUID")
   @Convert("uuidConverter")
   private UUID id;

   @Override
   public UUID getId() {
      return id;
   }

   @Override
   public void setId(UUID id) {
      this.id = id;
   }

   public static abstract class Builder<E extends UuidEntityBase> extends
         EntityBase.Builder<E> {

      public Builder<E> withId(UUID id) {
         getMember().setId(id);
         return this;
      }
   }
}