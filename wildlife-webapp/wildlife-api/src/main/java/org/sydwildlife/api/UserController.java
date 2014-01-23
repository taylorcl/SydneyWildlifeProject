package org.sydwildlife.api;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sydwildlife.domain.User;
import org.sydwildlife.service.user.UserService;
import org.sydwildlife.util.ApiResponse;

@Controller
@RequestMapping(value="/users")
public class UserController {
	public UserService userService;
	
	private static final Logger LOG = LoggerFactory.getLogger(UserController.class);
	
	@Inject
	public UserController(UserService userService){
		this.userService = userService;
	}

	@RequestMapping(method = RequestMethod.GET, value="")
	public @ResponseBody ApiResponse<List<User>> getUserList(){
		ApiResponse<List<User>> apiResponse = new ApiResponse<List<User>>();
		List<User> userList = new ArrayList<User>();
		userList = userService.findAllUsers();
		apiResponse.setPayload(userList);
		apiResponse.setStatus(ApiResponse.STATUS_SUCCESS);
		
		return  apiResponse;
	}
	
	@RequestMapping(method = RequestMethod.GET, value="/{userId}")
	public @ResponseBody ApiResponse<User> getUser(@PathVariable("userId") String id){
		ApiResponse<User> apiResponse = new ApiResponse<User>();
		User user = userService.findUserById(Long.valueOf(id));
		if (user != null){
			apiResponse.setPayload(user);
			apiResponse.setStatus(ApiResponse.STATUS_SUCCESS);
		}
		
		return apiResponse;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="")
	public @ResponseBody ApiResponse<User> createUser(@RequestBody User user){
		ApiResponse<User> apiResponse = new ApiResponse<User>();
		try {
			userService.createUser(user);
			apiResponse.setPayload(user);
			apiResponse.setStatus(ApiResponse.STATUS_SUCCESS);
		} catch (Exception e) {
			apiResponse.setCode(ApiResponse.STATUS_FAILURE);
			apiResponse.setMessage(e.getMessage());
			LOG.debug("Error posting user data: ", e);
			e.printStackTrace();
		}
				
		return  apiResponse;
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value="/{userId}")
	public @ResponseBody ApiResponse<User> deleteUser(@PathVariable("userId") String id){
		ApiResponse<User> apiResponse = new ApiResponse<User>();
		try {
			userService.deleteUser(Long.valueOf(id));
			apiResponse.setStatus(ApiResponse.STATUS_SUCCESS);
		} catch (Exception e) {
			apiResponse.setCode(ApiResponse.STATUS_FAILURE);
			apiResponse.setMessage(e.getMessage());
			LOG.debug("Error deleting user: ", e);
			e.printStackTrace();
		}
				
		return  apiResponse;
	}
}
