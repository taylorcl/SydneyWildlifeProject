package org.sydwildlife.api.testing;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

/**
 * Helper class deal with json objects conversion.
 * 
 */
public final class JsonHelper {
   private static final ObjectMapper MAPPER;
   static {
      MAPPER = new ObjectMapper();
   }

   public JsonHelper() {

   }

   public static String getJson(Object obj) throws JsonGenerationException, JsonMappingException,
         IOException {
      return MAPPER.writeValueAsString(obj);
   }
}
