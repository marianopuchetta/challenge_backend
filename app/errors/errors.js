class NotFound extends Error {
    constructor(message) {
      super()
      Error.captureStackTrace(this, this.constructor)
      this.statusCode = 404
      this.errorMessage = message || 'El recurso no se encuentra'
    }
  }

  module.exports = {NotFound}
  