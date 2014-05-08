package org.sydwildlife.init;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.sydwildlife.api.domain.Address;
import org.sydwildlife.api.domain.Member;
import org.sydwildlife.api.domain.enumeration.AuState;
import org.sydwildlife.api.service.MemberService;

/**
 * Bean initializing some mock data in the DB.
 */
@Component
public class MemberInitializer implements ApplicationListener<ContextRefreshedEvent> {

   private final static Logger logger = LoggerFactory.getLogger(MemberInitializer.class);

   @Autowired
   private MemberService memberService;

   @Override
   public void onApplicationEvent(ContextRefreshedEvent event) {
      List<Member> members = new ArrayList<Member>();

      Member claire = Member
            .builder()
            .withFirstName("Claire")
            .withLastName("Taylor")
            .withEmail("claire@taylor.com")
            .withHomeAddress(
                  new Address("32 Castleragh Street", "P.O. 324", "Sydney", AuState.NSW, "2000"))
            .withId(UUID.fromString("00000000-0000-0000-0000-000000000001"))
            .build();

      Member sherry = Member
            .builder()
            .withFirstName("Sherry")
            .withLastName("Wang")
            .withEmail("sherry@wang.com")
            .withHomeAddress(new Address("147 Pitt Street", "", "Paddington", AuState.NSW, "2017"))
            .withId(UUID.fromString("00000000-0000-0000-0000-000000000002"))
            .build();

      members.add(claire);
      members.add(sherry);

      for (int i = 0; i < 15; i++) {
         members.add(createRandomMember());
      }

      for (Member member : members) {
         memberService.save(member);
         logger.info("Member " + member.getFirstName() + " " + member.getLastName()
               + " saved in DB.", member);
      }
   }

   private Member createRandomMember() {
      String firstName = getRandomFirstName();
      String lastName = getRandomLastName();

      return Member
            .builder()
            .withFirstName(firstName)
            .withLastName(lastName)
            .withEmail(firstName.toLowerCase() + "@" + lastName.toLowerCase() + ".com")
            .withHomeAddress(
                  new Address(getRandomInt(3) + " " + getRandomStreetName() + " "
                        + getRandomStreetType(), "", getRandomSuburb(), getRandomState(), String
                        .valueOf(getRandomInt(4))))
            .withId(UUID.randomUUID())
            .build();
   }

   private String getRandomFirstName() {
      String[] firstNames = { "Tony", "Mathieu", "Elva", "Jeremy", "Michael", "Suk Yee", "Clive",
            "Clement", "Paul", "Ben", "Jack", "Elizabeth", "Caroline", "Jen", "Caitriona", "Rose" };

      return firstNames[new Random().nextInt(firstNames.length)];
   }

   private String getRandomLastName() {
      String[] lastNames = { "Blair", "Colombet", "Wang", "Taylor", "Leung", "White", "Tung",
            "Ross", "Cureau", "Crawford", "Kirk", "Rudy", "Rosa", "Ivanov", "Howes" };

      return lastNames[new Random().nextInt(lastNames.length)];
   }

   private String getRandomStreetType() {
      String[] streetTypes = { "Street", "Avenue", "Road", "Lane" };

      return streetTypes[new Random().nextInt(streetTypes.length)];
   }

   private String getRandomStreetName() {
      String[] streetNames = { "Pitt", "Dolphin", "Castelrough", "Market", "Elizabeth", "George",
            "Clarence", "Kent" };

      return streetNames[new Random().nextInt(streetNames.length)];
   }

   private String getRandomSuburb() {
      String[] suburbs = { "Paddington", "Coogee", "Sydney", "Bondi", "Maroubra", "North Sydney",
            "Hornsby", "Paramatta" };

      return suburbs[new Random().nextInt(suburbs.length)];
   }

   private AuState getRandomState() {
      AuState[] states = AuState.values();

      return states[new Random().nextInt(states.length)];
   }

   private int getRandomInt(int length) {
      StringBuilder sb = new StringBuilder();
      Random random = new Random();
      for (int i = 0; i < length; i++) {
         sb.append(random.nextInt(9));
      }

      return Integer.valueOf(sb.toString());
   }

}
