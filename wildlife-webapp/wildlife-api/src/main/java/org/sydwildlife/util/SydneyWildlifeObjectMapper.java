package org.sydwildlife.util;

import java.util.Date;

import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.module.SimpleModule;

public class SydneyWildlifeObjectMapper extends ObjectMapper {
	public SydneyWildlifeObjectMapper() {
		SimpleModule module = new SimpleModule("JSONModule", new Version(2, 0,
				0, null));
		module.addSerializer(Date.class, new DateSerializer());
		module.addDeserializer(Date.class, new DateDeserializer());
		// ...
		this.registerModule(module);
	}
}
