package org.sydwildlife.api;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sydwildlife.dto.VisitFrequency;
import org.sydwildlife.service.reporting.ReportingService;
import org.sydwildlife.util.ApiResponse;

@Controller
@RequestMapping(value="/reporting")
public class ReportingController {
	public ReportingService reportingService;
	
	private static final Logger LOG = LoggerFactory.getLogger(ReportingController.class);
	
	@Inject
	public ReportingController(ReportingService reportingService){
		this.reportingService = reportingService;
	}

	@RequestMapping(method = RequestMethod.GET, value="/visitFrequency") 
	public @ResponseBody ApiResponse<List<VisitFrequency>> getVisitFrequencyList(){
		ApiResponse<List<VisitFrequency>> apiResponse = new ApiResponse<List<VisitFrequency>>();
		List<VisitFrequency> visitFrequencyList = new ArrayList<VisitFrequency>();
		visitFrequencyList = reportingService.getVisitFrequency();
		apiResponse.setPayload(visitFrequencyList);
		apiResponse.setStatus(ApiResponse.STATUS_SUCCESS);
		LOG.debug("Sent back " + visitFrequencyList.size() + " data elements!");
		return  apiResponse;
	}
}
