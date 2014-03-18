package org.sydwildlife.api.controller;

import static org.junit.Assert.assertNotNull;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

import org.junit.Test;
import org.sydwildlife.api.domain.Member;
import org.sydwildlife.api.testing.AbstractControllerTest;
import org.sydwildlife.api.testing.JsonHelper;

/**
 * Warning, all tests must be run with the following VM argument:
 * -javaagent:C:\...\maven\repo\org\springframework\spring-instrument\4.0
 * .2.RELEASE\spring-instrument-4.0.2.RELEASE.jar
 * 
 */
public class MemberControllerTest extends AbstractControllerTest {

   private static final String API_URL = "/api/members/{id}";
   private static final String NON_EXIST_UUID = "11111111-2222-3333-4444-555555555555";

   @Test
   public void testGetOneNoFound() throws Exception {
      mockMvc
            .perform(get(API_URL, UUID.fromString(NON_EXIST_UUID))
                  .accept(APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk()) // TODO: should be isNotFound
            .andReturn();
   }

   @Test
   public void testGetOneOk() throws Exception {
      Member m = Member.builder()
            .withFirstName("mathieu")
            .withLastName("carrot")
            .build();
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
      Member m = Member.builder()
            .withFirstName("mathieu")
            .withLastName("carrot")
            .build();
      memberRepository.save(m);
      assertNotNull(m.getId());

      mockMvc
            .perform(get(API_URL, "")
                  .accept(APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn();
   }

   @Test
   public void createMemberShouldReturnOk() throws Exception {
      Member m = Member.builder()
            .withFirstName("carrot")
            .withLastName("carrot")
            .build();

      mockMvc
            .perform(post(API_URL, "")
                  .contentType(APPLICATION_JSON)
                  .content(JsonHelper.getJson(m)))
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn();
   }

   @Test
   public void createMemberShouldReturnBadRequest() throws Exception {
      Member m = Member.builder()
            .withFirstName("carrot")
            .withStatus(null)
            .build();

      mockMvc
            .perform(post(API_URL, "")
                  .contentType(APPLICATION_JSON)
                  .content(JsonHelper.getJson(m)))
            .andDo(print())
            .andExpect(status().isBadRequest())
            .andReturn();
   }
}