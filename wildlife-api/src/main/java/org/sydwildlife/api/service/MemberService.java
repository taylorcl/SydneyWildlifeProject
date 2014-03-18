package org.sydwildlife.api.service;

import java.util.UUID;

import org.sydwildlife.api.domain.Member;

public interface MemberService extends CrudService<Member, UUID> {

   /**
    * Update Member. This will first check if the member claim to be updated exists.
    * 
    * @param member
    *        {@link Member} to be updated.
    */
   public void updateMember(Member member);

   /**
    * 
    * Create Member.
    * 
    * @param member
    *        {@link Member} to be created.
    * @return the created member
    */
   public Member createMember(Member member);
}
