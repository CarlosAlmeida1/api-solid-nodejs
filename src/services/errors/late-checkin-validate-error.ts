export class LateCheckinValidateError extends Error {
  constructor() {
    super("You have exceeded the allowed time limit for checking in at the gym.");
  }
}
