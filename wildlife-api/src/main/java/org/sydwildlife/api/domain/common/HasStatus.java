package org.sydwildlife.api.domain.common;

import org.sydwildlife.api.domain.enumeration.Status;

public interface HasStatus {

   public Status getStatus();

   public void setStatus(Status status);
}
