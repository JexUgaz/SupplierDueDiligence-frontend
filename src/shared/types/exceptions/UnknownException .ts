import { AppException } from "./AppException";

export class UnknownException extends AppException {
  constructor(
    details = "An unexpected error occurred.",
    message = "Unknown error. Please try again later or contact support."
  ) {
    super("UNKNOWN_ERROR", details, 520, message);
  }
}
