package org.sydwildlife.api;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;

import javax.inject.Inject;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.type.TypeReference;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.context.WebApplicationContext;
import org.sydwildlife.domain.User;
import org.sydwildlife.service.user.UserService;
import org.sydwildlife.util.ApiResponse;

/**
 * This is a sample test that represents server side tests.
 * It is not representative of full test coverage or of the types of tests that should exist on the server side. 
 * @author Pankaj Tandon
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextHierarchy({
	@ContextConfiguration("/META-INF/spring/api-bootstrap-context.xml")
})
public class UserControllerFunctionalTests {

	private static final Logger LOG = LoggerFactory.getLogger(UserControllerFunctionalTests.class);
	
	@Inject
	private WebApplicationContext wac;	

	@Inject
	private UserService userService;
	
	@Inject
	private ObjectMapper jacksonObjectMapper;
	
	private Long createdUserId;
	
	private User user;
	
	private MockMvc mockMvc; 
	
	@Before
	public void setup() {
		this.mockMvc = webAppContextSetup(this.wac).build();
		
		User user = this.createTestUser();	
		userService.createUser(user);
		createdUserId = user.getId();
	}
	
	@Test
	public void testGettingUser() throws Exception {
		ResultActions resultActions = this.mockMvc.perform(get("/users/" + createdUserId)
				.accept(MediaType.APPLICATION_JSON));
		LOG.debug("RestultActons: " + resultActions.andReturn().getResponse().getContentAsString()) ;
		resultActions.andExpect(status().isOk())
		.andExpect(content().string(containsString(String.valueOf(createdUserId))));
	}	
	
	@Test
	public void testInsertingUser() throws Exception {
		User testUserToInsert = this.createTestUser();
		ResultActions resultActions = null;
		ApiResponse<User> retrievedUser = null;
		try {
			resultActions = this.mockMvc.perform(post("/users").content(convertObjectToBytes(testUserToInsert)).contentType(MediaType.APPLICATION_JSON));
			LOG.debug("RestultActons: " + resultActions.andReturn().getResponse().getContentAsString()) ;
			resultActions.andExpect(status().isOk())
						 .andExpect(content().string(notNullValue()));
			
		} finally {
			if (resultActions != null) {
				retrievedUser = this.jsonToObject(resultActions.andReturn().getResponse().getContentAsString());
				if (retrievedUser != null && retrievedUser.getPayload() != null){
					userService.deleteUser(retrievedUser.getPayload().getId());
				}
			}
		}
	}	
	
	@Test
	public void testGettingAllUsers() throws Exception {
		ResultActions resultActions = this.mockMvc.perform(get("/users"));
		LOG.debug("RestultActons: " + resultActions.andReturn().getResponse().getContentAsString()) ;
		resultActions.andExpect(status().isOk())
		 			 .andExpect(content().string(notNullValue()));
	}	
	
	@After
	public void afterEach() {
		userService.deleteUser(createdUserId);
	}
	
	private byte[] convertObjectToBytes(Object o)
			throws IOException {
		return jacksonObjectMapper.writeValueAsBytes(o); 
	}
	
	private  ApiResponse<User> jsonToObject(String jsonString) throws IOException {
		jacksonObjectMapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
		return jacksonObjectMapper.readValue(jsonString, new TypeReference<ApiResponse<User>>() {});
	}
	
	private User createTestUser() {
		user = new User();
		user.setFirstName("aFirstName");
		user.setLastName("aLastName");
		user.setAddress("anAddress");
		user.setCity("aCity");
		user.setState("aState");
		return user;
	}
}