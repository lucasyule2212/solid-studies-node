export class MaxNumberOfCheckinsError extends Error {
  constructor() {
    super('The user has reached the maximum number of check-ins for today')
    this.name = 'MaxNumberOfCheckinsError'
  }
}
