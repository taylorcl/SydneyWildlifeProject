package org.sydwildlife.project.backend.jpa.converter;

import java.util.UUID;

import org.eclipse.persistence.internal.helper.DatabaseField;
import org.eclipse.persistence.mappings.DatabaseMapping;
import org.eclipse.persistence.mappings.DirectCollectionMapping;
import org.eclipse.persistence.mappings.converters.Converter;
import org.eclipse.persistence.sessions.Session;

public class UUIDConverter implements Converter {

   private static final long serialVersionUID = 1L;

   @Override
   public Object convertObjectValueToDataValue(Object objectValue,
         Session session) {
      return objectValue;
   }

   @Override
   public UUID convertDataValueToObjectValue(Object dataValue,
         Session session) {
      return (UUID) dataValue;
   }

   @Override
   public boolean isMutable() {
      return true;
   }

   @Override
   public void initialize(DatabaseMapping mapping, Session session) {
      final DatabaseField field;
      if (mapping instanceof DirectCollectionMapping) {
         // handle @ElementCollection...
         field = ((DirectCollectionMapping) mapping).getDirectField();
      } else {
         field = mapping.getField();
      }

      field.setSqlType(java.sql.Types.OTHER);
      // field.setTypeName("uuid");
      field.setColumnDefinition("UUID");
   }
}
