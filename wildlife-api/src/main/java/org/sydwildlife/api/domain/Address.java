package org.sydwildlife.api.domain;

import javax.persistence.Embeddable;

import org.sydwildlife.api.domain.enumeration.AuState;

@Embeddable
public class Address {

   private String line1;
   private String line2;
   private String suburb;
   private AuState state = AuState.NSW;
   private String postcode;

   public Address() {

   }

   public Address(String line1, String line2, String suburb, AuState state, String postcode) {
      this.setLine1(line1);
      this.setLine2(line2);
      this.setSuburb(suburb);
      this.setState(state);
      this.setPostcode(postcode);
   }

   public String getSuburb() {
      return suburb;
   }

   public void setSuburb(String suburb) {
      this.suburb = suburb;
   }

   public AuState getState() {
      return state;
   }

   public void setState(AuState state) {
      this.state = state;
   }

   public String getPostcode() {
      return postcode;
   }

   public void setPostcode(String postcode) {
      this.postcode = postcode;
   }

   public String getLine1() {
      return line1;
   }

   public void setLine1(String line1) {
      this.line1 = line1;
   }

   public String getLine2() {
      return line2;
   }

   public void setLine2(String line2) {
      this.line2 = line2;
   }

   // TODO: add address builder
}
