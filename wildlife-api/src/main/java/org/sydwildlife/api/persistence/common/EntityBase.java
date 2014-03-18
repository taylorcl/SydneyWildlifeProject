/* Copyright VMware, Inc. All rights reserved. -- VMware Confidential */

package org.sydwildlife.api.persistence.common;

import java.io.Serializable;

import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.sydwildlife.api.domain.common.Identifiable;

public abstract class EntityBase<T extends Serializable> implements Identifiable<T> {

   /** {@inheritDoc} */
   @Override
   public int hashCode() {
      if (getId() != null) {
         return new HashCodeBuilder(11, 31).append(getId()).append(this.getClass()).toHashCode();
      } else {
         return super.hashCode();
      }
   }

   /** {@inheritDoc} */
   @Override
   public boolean equals(Object obj) {
      if (getId() != null) {
         if (obj == null) {
            return false;
         } else if (obj == this) {
            return true;
         }

         if (getClass().equals(obj.getClass())) {
            return getId().equals(((EntityBase<?>) obj).getId());
         } else {
            return false;
         }
      } else {
         return super.equals(obj);
      }
   }

   public static abstract class Builder<E extends EntityBase<?>> {

      private E target;

      public E getMember() {
         if (target == null) {
            target = getNewInstance();
         }
         return target;
      }

      public E build() {
         try {
            return target;
         } finally {
            target = null;
         }
      }

      protected abstract E getNewInstance();
   }
}
