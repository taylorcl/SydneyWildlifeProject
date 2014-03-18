package org.sydwildlife.api.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.sydwildlife.api.domain.Member;
import org.sydwildlife.api.service.CrudService;
import org.sydwildlife.api.service.MemberService;

@RestController
@RequestMapping("/api/members")
public class MemberController extends AbstractCrudController<Member, UUID> {

   @Autowired
   private MemberService memberService;

   @Override
   protected CrudService<Member, UUID> getCrudService() {
      return memberService;
   }
}
