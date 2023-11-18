class ApiError extends Error {
  statusCode: number;
  message: string;
  errors: any[];
  stack: string;
  data: any;
  success: boolean;

  constructor(
    statusCode: number,
    message: string = "Something Went Wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.stack = stack;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
