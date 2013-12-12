package org.sydwildlife.project.backend.service;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.sydwildlife.project.backend.domain.EntityExemple;
import org.sydwildlife.project.backend.repository.EntityRepository;

@Service
public class EntityServiceImpl implements EntityService {

   private static final Logger logger = LoggerFactory.getLogger(EntityServiceImpl.class);

   @Autowired
   private EntityRepository entityRepository;

   @Override
   public EntityExemple findOne(UUID id) {

      return entityRepository.findOne(id);
   }

}
