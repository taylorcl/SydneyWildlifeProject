package org.sydwildlife.api.domain;

import javax.persistence.Cacheable;
import javax.persistence.Entity;

import org.sydwildlife.api.persistence.common.UuidEntityBase;

@Entity
@Cacheable
public class Member extends UuidEntityBase {

   private String firstName;

   private String lastName;

   private String suburb;

   private String address; // TODO: need to separate street, postcode, suburb?

   private String postalAddress;

   private String email;

   private String branch; // TODO: use Branch in the future after Branch api built.

   private String phone;

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

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public static Builder builder() {
      return new Builder();
   }

   public String getSuburb() {
      return suburb;
   }

   public void setSuburb(String suburb) {
      this.suburb = suburb;
   }

   public String getAddress() {
      return address;
   }

   public void setAddress(String address) {
      this.address = address;
   }

   public String getPostalAddress() {
      return postalAddress;
   }

   public void setPostalAddress(String postalAddress) {
      this.postalAddress = postalAddress;
   }

   public String getBranch() {
      return branch;
   }

   public void setBranch(String branch) {
      this.branch = branch;
   }

   public String getPhone() {
      return phone;
   }

   public void setPhone(String phone) {
      this.phone = phone;
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

      public Builder withEmail(String email) {
         getMember().setEmail(email);
         return this;
      }

      public Builder withSuburb(String suburb) {
         getMember().setSuburb(suburb);
         return this;
      }

      public Builder withBranch(String branch) {
         getMember().setBranch(branch);
         return this;
      }

      @Override
      protected Member getNewInstance() {
         return new Member();
      }

   }

}
