export class LateCheckinValidationError extends Error {
  constructor() {
    super(
      'The check-in can only be validated within 20 minutes of its creation',
    )
    this.name = 'LateCheckinValidationError'
  }
}
