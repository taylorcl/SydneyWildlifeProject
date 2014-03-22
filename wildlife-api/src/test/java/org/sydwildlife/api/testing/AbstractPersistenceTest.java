package org.sydwildlife.api.testing;

import org.junit.After;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.sydwildlife.api.persistence.repository.AnimalRepository;
import org.sydwildlife.api.persistence.repository.MemberRepository;

@ActiveProfiles(profiles = { "Junit" })
@RunWith(SpringJUnit4ClassRunner.class)
@Ignore
public class AbstractPersistenceTest {

   @Autowired
   protected MemberRepository memberRepository;

   @Autowired
   protected AnimalRepository animalRepository;

   @After
   public void cleanUp() throws Exception {
      memberRepository.deleteAll();
      animalRepository.deleteAll();
   }

}