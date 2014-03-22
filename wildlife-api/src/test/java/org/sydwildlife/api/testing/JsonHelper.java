package org.sydwildlife.api.testing;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Helper class deal with json objects conversion.
 * 
 */
public final class JsonHelper {
   private static final ObjectMapper MAPPER;
   static {
      MAPPER = new ObjectMapper();
   }

   private JsonHelper() {
   }

   public static String getJson(Object obj) throws JsonGenerationException, JsonMappingException,
         IOException {
      return MAPPER.writeValueAsString(obj);
   }

   public static Object readJsonFromString(String str, Class<?> type) throws JsonParseException,
         JsonMappingException, IOException {
      return MAPPER.readValue(str, type);
   }
}
