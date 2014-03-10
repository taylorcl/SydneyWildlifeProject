/* Copyright 2012 VMware, Inc. All rights reserved. -- VMware Confidential */

package org.sydwildlife.api.domain;

import java.io.Serializable;

public interface Identifiable<ID extends Serializable> {

   ID getId();

   void setId(ID id);

}
