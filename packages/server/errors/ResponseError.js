export default class ResponseError extends Error {
  constructor({
    statusCode = 500,
    code = 'server_error',
    message = 'Server error'
  }) {
    super();

    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
  }

  response() {
    return {
      object: 'error',
      code: this.code,
      message: this.message
    };
  }
}
