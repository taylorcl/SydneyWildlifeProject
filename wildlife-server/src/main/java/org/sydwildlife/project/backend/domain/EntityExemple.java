package org.sydwildlife.project.backend.domain;

import java.util.UUID;

import javax.persistence.Cacheable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.eclipse.persistence.annotations.Convert;
import org.eclipse.persistence.annotations.Converter;
import org.eclipse.persistence.annotations.UuidGenerator;
import org.sydwildlife.project.backend.jpa.converter.UUIDConverter;

@Entity
@Cacheable
@UuidGenerator(name = "UUID")
@Converter(name = "uuidConverter", converterClass = UUIDConverter.class)
public class EntityExemple {

   @Id
   @GeneratedValue(generator = "UUID")
   @Convert("uuidConverter")
   private UUID id;

   private String domainName;

   private String ip;

   @ManyToOne(fetch = FetchType.LAZY, optional = false)
   private EntityExemple entityExemple;

   public UUID getId() {
      return id;
   }

   public void setId(UUID id) {
      this.id = id;
   }

   public String getDomainName() {
      return domainName;
   }

   public void setDomainName(String domainName) {
      this.domainName = domainName;
   }

   public String getIp() {
      return ip;
   }

}
