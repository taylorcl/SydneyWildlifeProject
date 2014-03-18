package org.sydwildlife.api.controller;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.sydwildlife.api.domain.Member;
import org.sydwildlife.api.service.MemberService;

@RestController
@RequestMapping("/api/members")
public class MemberController {

   @Autowired
   private MemberService memberService;

   @RequestMapping(method = GET)
   public Page<Member> findMany() {// TODO Pageable
      return memberService.findAll(null);
   }

   @RequestMapping(value = "/{id}", method = GET)
   public Member findOne(@PathVariable UUID id) {
      return memberService.findOne(id);
   }

   @RequestMapping(method = POST)
   public Member updateMember(@RequestBody Member member) {
      return memberService.createMember(member);
   }

   @RequestMapping(value = "/{id}", method = DELETE)
   public void deleteOne(@PathVariable UUID id) {
      throw new UnsupportedOperationException("todo");
      // memberService.delete(id);
   }
}