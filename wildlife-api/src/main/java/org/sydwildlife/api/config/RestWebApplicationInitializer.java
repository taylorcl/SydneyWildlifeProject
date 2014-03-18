package org.sydwildlife.api.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class RestWebApplicationInitializer implements WebApplicationInitializer {

   @Override
   public void onStartup(ServletContext servletContext) throws ServletException {

      // setup the ContextLoaderListener listener
      XmlWebApplicationContext rootContext = new XmlWebApplicationContext();
      rootContext.setConfigLocations(new String[] {
            "classpath*:/META-INF/spring/spring-service-context.xml" });
      servletContext.addListener(new ContextLoaderListener(rootContext));

      XmlWebApplicationContext appContext = new XmlWebApplicationContext();
      appContext.setConfigLocation("classpath*:/META-INF/spring/spring-mvc-context.xml");

      // setup the Spring dispatcher servlet listener
      ServletRegistration.Dynamic registration =
            servletContext.addServlet("dispatcher", new DispatcherServlet(appContext));
      registration.setLoadOnStartup(1);
      registration.addMapping("/");

   }

}
