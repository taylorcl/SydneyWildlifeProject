package org.sydwildlife.api.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.sydwildlife.api.domain.Member;
import org.sydwildlife.api.persistence.repository.MemberRepository;
import org.sydwildlife.api.service.MemberService;

@Service
public class MemberServiceImpl extends AbstractCrudService<Member, UUID> implements MemberService {

   @Autowired
   private MemberRepository memberRepo;

   @Override
   protected JpaRepository<Member, UUID> getRepository() {
      return memberRepo;
   }

   @Override
   public void updateMember(Member member) {
      Member existingMember = memberRepo.findOne(member.getId());
      if (existingMember != null) {
         memberRepo.save(member);
      } else {
         // TODO: throw resource not found exception
      }
   }

   @Override
   public Member createMember(Member member) {
      return memberRepo.save(member);
   }

}
