package org.sydwildlife.api.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.test.web.servlet.MvcResult;
import org.sydwildlife.api.domain.Address;
import org.sydwildlife.api.domain.Animal;
import org.sydwildlife.api.domain.enumeration.AuState;
import org.sydwildlife.api.testing.AbstractControllerTest;
import org.sydwildlife.api.testing.JsonHelper;

public class AnimalControllerTest extends AbstractControllerTest {

   private static final String API_URL = "/api/animals/{id}";

   @Test
   public void createAnimalWithAllMandatoryInfoShouldReturnOk() throws Exception {
      Address callerAdd = new Address("line1", "line2", "Sydney", AuState.NSW, "2000");
      Animal a = Animal.builder()
            .withCallerAddress(callerAdd)
            .build();

      MvcResult result = mockMvc
            .perform(post(API_URL, "")
                  .contentType(APPLICATION_JSON)
                  .content(JsonHelper.getJson(a)))
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn();

      Object output = JsonHelper.readJsonFromString(result.getResponse().getContentAsString(),
            Animal.class);
      Assert.assertEquals("line1", ((Animal) output).getCallerAddress().getLine1());
   }

}
