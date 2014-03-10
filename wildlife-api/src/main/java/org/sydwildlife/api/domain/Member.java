package org.sydwildlife.api.domain;

import javax.persistence.Cacheable;
import javax.persistence.Entity;

import org.sydwildlife.api.persistence.common.UuidEntityBase;

@Entity
@Cacheable
public class Member extends UuidEntityBase {

   private String firstName;

   private String lastName;

   private String emailAddress;

   public String getFirstName() {
      return firstName;
   }

   public void setFirstName(String firstName) {
      this.firstName = firstName;
   }

   public String getLastName() {
      return lastName;
   }

   public void setLastName(String lastName) {
      this.lastName = lastName;
   }

   public String getEmailAddress() {
      return emailAddress;
   }

   public void setEmailAddress(String emailAddress) {
      this.emailAddress = emailAddress;
   }

   public static Builder builder() {
      return new Builder();
   }

   public static class Builder extends UuidEntityBase.Builder<Member> {

      public Builder withLastName(String lastName) {
         getMember().setLastName(lastName);
         return this;
      }

      public Builder withFirstName(String firstName) {
         getMember().setFirstName(firstName);
         return this;
      }

      public Builder withEmailAddress(String emailAddress) {
         getMember().setEmailAddress(emailAddress);
         return this;
      }

      @Override
      protected Member getNewInstance() {
         return new Member();
      }

   }

}
