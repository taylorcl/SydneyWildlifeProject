package org.sydwildlife.api.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.sydwildlife.api.domain.Branch;

public interface BranchRepository extends JpaRepository<Branch, String> {

}
