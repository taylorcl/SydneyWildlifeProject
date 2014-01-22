package org.sydwildlife.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;

import org.apache.commons.lang3.time.DateUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.type.TypeReference;
import org.joda.time.DateTime;
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
import org.springframework.util.Assert;
import org.springframework.web.context.WebApplicationContext;
import org.sydwildlife.domain.User;
import org.sydwildlife.dto.VisitFrequency;
import org.sydwildlife.service.reporting.ReportingService;
import org.sydwildlife.service.user.UserService;
import org.sydwildlife.util.ApiResponse;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextHierarchy({
	@ContextConfiguration("/META-INF/spring/api-bootstrap-context.xml")
})
public class ReportingControllerFunctionalTests {

	private static final Logger LOG = LoggerFactory.getLogger(ReportingControllerFunctionalTests.class);
	
	@Inject
	private WebApplicationContext wac;	

	@Inject
	private UserService userService;

	@Inject
	private ReportingService reportingService;
	
	@Inject
	private ObjectMapper jacksonObjectMapper;
	
	private Long createdUserId1;
	private Long createdUserId2;
	private Long createdUserId25;
	private Long createdUserId3;
	private Long createdUserId4;
	
	private MockMvc mockMvc; 
	
	private DateTime today;
	private DateTime todayInTheAM;
	private DateTime todayInThePM;
	private DateTime tomorrow;
	private DateTime dayAfter;
	private DateTime yesterday;
	@Before
	public void setup() {
		this.mockMvc = webAppContextSetup(this.wac).build();
		
		today = new DateTime();
		int todaysYear = today.getYear();
		int todaysMonth = today.getMonthOfYear();
		int todaysDay = today.getDayOfMonth();
		todayInTheAM = new DateTime(todaysYear, todaysMonth, todaysDay, 10, 15); //10:15 am
		todayInThePM = new DateTime(todaysYear, todaysMonth, todaysDay, 14, 25); //2:25 pm
		
		tomorrow = today.plusDays(1);
		dayAfter = tomorrow.plusDays(1);
		yesterday = today.minusDays(1);
		
		User user1 = this.createTestUser(yesterday);
		User user2 = this.createTestUser(todayInTheAM);
		User user25 = this.createTestUser(todayInThePM);
		User user3 = this.createTestUser(tomorrow);
		User user4 = this.createTestUser(dayAfter);
		
		userService.createUser(user1);
		userService.createUser(user2);
		userService.createUser(user25);
		userService.createUser(user3);
		userService.createUser(user4);
		createdUserId1 = user1.getId();
		createdUserId2 = user2.getId();
		createdUserId25 = user25.getId();
		createdUserId3 = user3.getId();
		createdUserId4 = user4.getId();
	}
	
	@Test
	public void testGettingAllVisitFreqs() throws Exception {
		ResultActions resultActions = this.mockMvc.perform(get("/reporting/visitFrequency" )
				.accept(MediaType.APPLICATION_JSON));
		String result = resultActions.andReturn().getResponse().getContentAsString();
		LOG.debug("RestultActons: " + result) ;
		
		resultActions.andExpect(status().isOk());
		ApiResponse<List<VisitFrequency>> apiResponse = jsonToObject(result); 

		List<VisitFrequency> vfList = apiResponse.getPayload();
		int days = 0;
		for (VisitFrequency visitFrequency : vfList) {
			if (DateUtils.isSameDay(visitFrequency.getVisitDate(), yesterday.toDate())){
				Assert.isTrue(visitFrequency.getNumberOfVisits() == 1);
				days++;
			}
			if (DateUtils.isSameDay(visitFrequency.getVisitDate(), today.toDate())){
				Assert.isTrue(visitFrequency.getNumberOfVisits() == 2);
				days++;
			}
			if (DateUtils.isSameDay(visitFrequency.getVisitDate(), tomorrow.toDate())){
				Assert.isTrue(visitFrequency.getNumberOfVisits() == 1);
				days++;
			}
			if (DateUtils.isSameDay(visitFrequency.getVisitDate(), dayAfter.toDate())){
				Assert.isTrue(visitFrequency.getNumberOfVisits() == 1);
				days++;
			}
		}		
		Assert.isTrue(days >= 4);
	}	
	
	@After
	public void afterEach() {
		userService.deleteUser(createdUserId1);
		userService.deleteUser(createdUserId2);
		userService.deleteUser(createdUserId25);
		userService.deleteUser(createdUserId3);
		userService.deleteUser(createdUserId4);
	}
	
	private  ApiResponse<List<VisitFrequency>> jsonToObject(String jsonString) throws IOException {
		jacksonObjectMapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
		return jacksonObjectMapper.readValue(jsonString, new TypeReference<ApiResponse<List<VisitFrequency>>>() {});
	}
	
	private User createTestUser(DateTime datetime) {
		User user = new User();
		user.setFirstName("aFirstName");
		user.setLastName("aLastName");
		user.setAddress("anAddress");
		user.setCity("aCity");
		user.setState("aState");
		user.setVisitDate(datetime.toDate());
		return user;
	}
}