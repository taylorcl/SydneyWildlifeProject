package org.sydwildlife.api.domain;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;

import org.sydwildlife.api.domain.common.HasStatus;
import org.sydwildlife.api.domain.enumeration.Status;
import org.sydwildlife.api.persistence.common.UuidEntityBase;
import org.sydwildlife.defaults.DefaultSettings;

@Entity
@Cacheable
public class Animal extends UuidEntityBase implements HasStatus {

   @NotNull
   @Column(length = DefaultSettings.DEFAULT_COLUMN_SIZE_SMALL, nullable = false)
   @Enumerated(EnumType.STRING)
   private Status status = Status.ACTIVE;

   @Embedded
   @AttributeOverrides({
         @AttributeOverride(name = "line1", column = @Column(name = "CALLERLINE1")),
         @AttributeOverride(name = "line2", column = @Column(name = "CALLERLINE2")),
         @AttributeOverride(name = "suburb", column = @Column(name = "CALLERSUBURB")),
         @AttributeOverride(name = "postcode", column = @Column(name = "CALLERPOSTCODE")),
         @AttributeOverride(name = "state", column = @Column(name = "CALLERSTATE"))
   })
   private Address callerAddress;

   @NotNull
   @Column(length = DefaultSettings.DEFAULT_COLUMN_SIZE_MEDIUM, nullable = false)
   private String description;

   @NotNull
   @Column(length = DefaultSettings.DEFAULT_COLUMN_SIZE_SMALL, nullable = false)
   private String callerPhone;

   @Override
   public Status getStatus() {
      return status;
   }

   public Address getCallerAddress() {
      return callerAddress;
   }

   public void setCallerAddress(Address callerAddress) {
      this.callerAddress = callerAddress;
   }

   public String getCallerPhone() {
      return callerPhone;
   }

   public void setCallerPhone(String phone) {
      callerPhone = phone;
   }

   public String getDescription() {
      return description;
   }

   public void setDescription(String description) {
      this.description = description;
   }

   @Override
   public void setStatus(Status status) {
      this.status = status;
   }

   public static Builder builder() {
      return new Builder();
   }

   public static class Builder extends UuidEntityBase.Builder<Animal> {

      public Builder withCallerAddress(Address callerAddress) {
         getMember().setCallerAddress(callerAddress);
         return this;
      }

      public Builder withCallerPhone(String phone) {
         getMember().setCallerPhone(phone);
         return this;
      }

      public Builder withDescription(String description) {
         getMember().setDescription(description);
         return this;
      }

      public Builder withStatus(Status status) {
         getMember().setStatus(status);
         return this;
      }

      @Override
      protected Animal getNewInstance() {
         Animal a = new Animal();
         a.setCallerPhone("testPhone1234");
         a.setDescription("testDescription");
         a.setStatus(Status.ACTIVE);
         return a;
      }

   }

}
