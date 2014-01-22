package org.sydwildlife.exception;

public class SydneyWildlifeRuntimeException extends RuntimeException {

	private static final long serialVersionUID = -5851973184070845138L;

	public SydneyWildlifeRuntimeException() { 
		super();
	}

	public SydneyWildlifeRuntimeException(String message) {
		super(message);
	}

	public SydneyWildlifeRuntimeException(Throwable cause) {
		super(cause);
	}

	public SydneyWildlifeRuntimeException(String message, Throwable cause) {
		super(message, cause);
	}

}