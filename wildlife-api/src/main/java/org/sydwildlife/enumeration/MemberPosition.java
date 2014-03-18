package org.sydwildlife.enumeration;

public enum MemberPosition {

   BOARD_CHAIR("Board Chair"),
   BOARD_SECRETARY("Board Secretary"),
   BRANCH_CHAIR("Branch Chair"),
   BRANCH_SECRETARY("Branch Secretary");

   private String description;

   MemberPosition(String desc) {
      description = desc;
   }

   @Override
   public String toString() {
      return description;
   }
}
