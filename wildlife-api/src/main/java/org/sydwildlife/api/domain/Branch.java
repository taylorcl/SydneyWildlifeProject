package org.sydwildlife.api.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Branch (or referred as Area sometimes) represents a list of area that can be created and
 * modified.
 * 
 */
@Entity
public class Branch {

   @Id
   private String name;

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }
}
