package org.sydwildlife.api.rest.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

   private final static Logger logger = LoggerFactory.getLogger(RestExceptionHandler.class);

   @ExceptionHandler(RestResourceNotFoundException.class)
   @ResponseStatus(value = HttpStatus.NOT_FOUND)
   public void handleNotFoundException(Exception ex) {
      logger.debug(ex.toString(), ex);
   }

   @ExceptionHandler(IllegalArgumentException.class)
   @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
   public void handleIllegalArgumentException(Exception ex) {
      logger.debug(ex.toString(), ex);
   }

   @ExceptionHandler(Exception.class)
   @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
   public void handleUnexpectedException(Exception ex) {
      logger.error(ex.toString(), ex);
   }

}
