package org.sydwildlife.project.backend.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.sydwildlife.project.backend.domain.EntityExemple;
import org.sydwildlife.project.backend.service.EntityService;

@Controller
@RequestMapping("api/dns")
public class EndpointController {

   private static final Logger logger = LoggerFactory.getLogger(EndpointController.class);

   @Autowired
   private EntityService entityService;

   @RequestMapping(value = "/initialize", method = GET)
   @ResponseBody
   public String initialize(HttpServletRequest request) {
      logger.info("remote backend initialize");
      return "{\"result\":true}";
   }

   @RequestMapping(value = "/lookup/{id}", method = GET)
   @ResponseBody
   public EntityExemple lookup(HttpServletRequest request,
         @PathVariable UUID id) {
      logger.info("Lookup received for {}", id);

      return entityService.findOne(id);

   }
}