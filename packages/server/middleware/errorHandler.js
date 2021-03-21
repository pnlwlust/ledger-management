import ResponseError from '../errors/ResponseError.js';

export default function errorHandler(err, req, res, next) {
  if (err instanceof Error) {
    const { statusCode = 500 } = err;

    if (typeof err.response === 'function') {
      return res.status(statusCode).send(err.response());
    }

    console.error(err);

    const responseError = new ResponseError({ message: err.message });
    return res.status(statusCode).send(responseError.response());
  }

  return next();
}
