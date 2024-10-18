export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Ressource nicht gefunden") {
    super(message, 404);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Ungültige Anfrage") {
    super(message, 400);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Interner Serverfehler") {
    super(message, 500);
  }
}
