package org.sydwildlife.api.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.sydwildlife.api.domain.Animal;
import org.sydwildlife.api.service.AnimalService;
import org.sydwildlife.api.service.CrudService;

@RestController
@RequestMapping("/api/animals")
public class AnimalController extends AbstractCrudController<Animal, UUID> {

   @Autowired
   private AnimalService animalService;

   @Override
   protected CrudService<Animal, UUID> getCrudService() {
      return animalService;
   }
}