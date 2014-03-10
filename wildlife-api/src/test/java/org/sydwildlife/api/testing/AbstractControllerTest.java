package org.sydwildlife.api.testing;

import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.Before;
import org.junit.Ignore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@WebAppConfiguration
@ContextConfiguration({ "classpath*:META-INF/spring/spring-*.xml" })
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = false)
@Ignore
public class AbstractControllerTest extends AbstractPersistenceTest {

   protected static MockMvc mockMvc;

   @Autowired
   protected WebApplicationContext wac;

   @Before
   public void setUp() throws Exception {
      mockMvc = webAppContextSetup(wac).build();
   }

}