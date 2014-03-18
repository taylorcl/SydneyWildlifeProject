package org.sydwildlife.enumeration;

public enum Branch {
   EAST("Eastern Suburb"),
   WEST("Western Suburb");

   private String name;

   Branch(String name) {
      this.name = name;
   }

   @Override
   public String toString() {
      return name;
   }

}
