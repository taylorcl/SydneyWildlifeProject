package org.sydwildlife.api.controller;

import static org.junit.Assert.assertNotNull;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

import org.junit.Test;
import org.sydwildlife.api.domain.Member;
import org.sydwildlife.api.testing.AbstractControllerTest;

/**
 * Warning, all tests must be run with the following VM argument:
 * -javaagent:C:\...\maven\repo\org\springframework\spring-instrument\4.0
 * .2.RELEASE\spring-instrument-4.0.2.RELEASE.jar
 * 
 */
public class MemberControllerTest extends AbstractControllerTest {

   private static final String API_URL = "/api/members/{id}";

   @Test
   public void testGetOneNoFound() throws Exception {
      mockMvc
            .perform(get(API_URL, UUID.randomUUID())
                  .accept(APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())// TODO isNotFound
            .andReturn();
   }

   @Test
   public void testGetOneOk() throws Exception {
      Member m = Member.builder().withFirstName("mathieu").build();
      memberRepository.save(m);
      assertNotNull(m.getId());

      mockMvc
            .perform(get(API_URL, m.getId())
                  .accept(APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn();
   }

   @Test
   public void testGetAllNoFound() throws Exception {
      mockMvc
            .perform(get(API_URL, "")
                  .accept(APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn();
   }

   @Test
   public void testGetAllOk() throws Exception {
      Member m = Member.builder().withFirstName("mathieu").build();
      memberRepository.save(m);
      assertNotNull(m.getId());

      mockMvc
            .perform(get(API_URL, "")
                  .accept(APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn();
   }

}