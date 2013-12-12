package org.sydwildlife.project.backend.service;

import java.util.UUID;

import org.sydwildlife.project.backend.domain.EntityExemple;

public interface EntityService {

   public EntityExemple findOne(UUID id);

}
