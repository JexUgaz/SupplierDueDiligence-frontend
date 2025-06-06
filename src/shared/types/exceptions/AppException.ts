export class AppException extends Error {
  public type: string;
  public details: string;
  public errorCode: number;

  constructor(
    type: string,
    details: string,
    errorCode = 500,
    message = "An error occurred while processing your request. Please try again or contact support."
  ) {
    super(message);
    this.type = type;
    this.details = details;
    this.errorCode = errorCode;

    Object.setPrototypeOf(this, AppException.prototype);
  }
}
