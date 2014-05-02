package org.sydwildlife.api.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

import org.junit.Assert;
import org.junit.Test;
import org.sydwildlife.api.domain.Address;
import org.sydwildlife.api.domain.Member;
import org.sydwildlife.api.domain.enumeration.AuState;
import org.sydwildlife.api.testing.AbstractControllerTest;
import org.sydwildlife.api.testing.JsonHelper;
import org.sydwildlife.enumeration.Branch;
import org.sydwildlife.enumeration.MemberPosition;

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
      Assert.assertNotNull(m.getId());

      mockMvc
            .perform(get(API_URL, m.getId())
                  .accept(APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn();
   }

   @Test
   public void testSimplePageableParameterShouldWork() throws Exception {
      Member m = Member.builder()
            .withFirstName("mathieu")
            .withLastName("carrot")
            .build();
      memberRepository.save(m);

      Member m1 = Member.builder()
            .withFirstName("another")
            .withLastName("carrot")
            .build();
      memberRepository.save(m1);

      mockMvc
            .perform(get(API_URL + "?page=0&size=1", "")
                  .accept(APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalPages").value(2))
            .andExpect(jsonPath("$.firstPage").value(true))
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
      Member m = Member.builder().build();
      memberRepository.save(m);
      Assert.assertNotNull(m.getId());

      mockMvc
            .perform(get(API_URL, "")
                  .accept(APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn();
   }

   @Test
   public void createMemberWithAddressShouldReturnOk() throws Exception {
      Address homeAdd = new Address("line1", "line2", "Sydney", AuState.NSW, "2000");
      Address postalAdd = new Address("pline1", "line2", "Sydney", AuState.NSW, "2001");
      Member m = Member.builder()
            .withHomeAddress(homeAdd)
            .withPostalAddress(postalAdd)
            .build();

      mockMvc
            .perform(post(API_URL, "")
                  .contentType(APPLICATION_JSON)
                  .content(JsonHelper.getJson(m)))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.homeAddress.line1").value("line1"))
            .andExpect(jsonPath("$.postalAddress.line1").value("pline1"))
            .andReturn();
   }

   @Test
   public void createMemberShouldReturnOk() throws Exception {
      Member m = Member.builder()
            .withFirstName("mathieu")
            .withLastName("carrot")
            .withBranch(Branch.EAST)
            .withPosition(MemberPosition.BOARD_SECRETARY)
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
