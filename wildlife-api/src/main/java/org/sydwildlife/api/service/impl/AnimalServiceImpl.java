package org.sydwildlife.api.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.sydwildlife.api.domain.Animal;
import org.sydwildlife.api.persistence.repository.AnimalRepository;
import org.sydwildlife.api.service.AnimalService;

@Service
public class AnimalServiceImpl extends AbstractCrudService<Animal, UUID> implements AnimalService {

   @Autowired
   private AnimalRepository animalRepo;

   @Override
   protected JpaRepository<Animal, UUID> getRepository() {
      return animalRepo;
   }

}
