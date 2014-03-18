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
import org.sydwildlife.defaults.DefaultSettings;
import org.sydwildlife.enumeration.Branch;
import org.sydwildlife.enumeration.MemberPosition;

@Entity
@Cacheable
public class Member extends UuidEntityBase implements HasStatus {

   @NotNull
   @Column(length = DefaultSettings.DEFAULT_COLUMN_NAME_LENGTH, nullable = false)
   private String firstName;

   @NotNull
   @Column(length = DefaultSettings.DEFAULT_COLUMN_NAME_LENGTH, nullable = false)
   private String lastName;

   private String title;

   private Address homeAddress;

   // @Embedded
   // @AttributeOverrides({
   // @AttributeOverride(name = "postalLine1", column = @Column("LINE1")),
   // @AttributeOverride(name = "postalLine2", column = @Column("LINE2"))
   // })
   // private Address postalAddress;

   private String email;

   private Branch branch;

   private String phone;

   @NotNull
   @Column(length = DefaultSettings.DEFAULT_COLUMN_ENUM_LENGTH, nullable = false)
   @Enumerated(EnumType.STRING)
   private Status status = Status.ACTIVE;

   @Column(length = DefaultSettings.DEFAULT_COLUMN_ENUM_LENGTH)
   @Enumerated(EnumType.STRING)
   private MemberPosition position;

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

   // public Address getPostalAddress() {
   // return postalAddress;
   // }
   //
   // @Embedded
   // public void setPostalAddress(Address postalAddress) {
   // this.postalAddress = postalAddress;
   // }

   public Branch getBranch() {
      return branch;
   }

   public void setBranch(Branch branch) {
      this.branch = branch;
   }

   public String getPhone() {
      return phone;
   }

   public void setPhone(String phone) {
      this.phone = phone;
   }

   public MemberPosition getPosition() {
      return position;
   }

   public void setPosition(MemberPosition position) {
      this.position = position;
   }

   public String getTitle() {
      return title;
   }

   public void setTitle(String title) {
      this.title = title;
   }

   @Override
   public Status getStatus() {
      return status;
   }

   @Override
   public void setStatus(Status status) {
      this.status = status;
   }

   public Address getHomeAddress() {
      return homeAddress;
   }

   public void setHomeAddress(Address homeAddress) {
      this.homeAddress = homeAddress;
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

      public Builder withBranch(Branch branch) {
         getMember().setBranch(branch);
         return this;
      }

      public Builder withPosition(MemberPosition position) {
         getMember().setPosition(position);
         return this;
      }

      public Builder withStatus(Status status) {
         getMember().setStatus(status);
         return this;
      }

      public Builder withHomeAddress(Address address) {
         getMember().setHomeAddress(address);
         return this;
      }

      @Override
      protected Member getNewInstance() {
         return new Member();
      }

   }

}
