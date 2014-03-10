package org.sydwildlife.api.persistence.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.sydwildlife.api.domain.Member;

public interface MemberRepository extends JpaRepository<Member, UUID> {

}