export class MaxDistanceError extends Error {
  constructor() {
    super('The gym is too far from the user')
    this.name = 'MaxDistanceError'
  }
}
