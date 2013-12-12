package org.sydwildlife.project.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.sydwildlife.project.backend.domain.EntityExemple;

public interface EntityRepository extends JpaRepository<EntityExemple, UUID> {

   public List<EntityExemple> findByDomainName(String domainName);

   public List<EntityExemple> findByReversedIp(String reversedIp);

}