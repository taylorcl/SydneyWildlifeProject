package org.sydwildlife.api.persistence.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.sydwildlife.api.domain.Animal;

public interface AnimalRepository extends JpaRepository<Animal, UUID> {

}