class ApiResponse {
  statusCode: number;
  data: any;
  message: string;

  constructor(statusCode: number, data: any, message: string = "success") {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode < 400 ? statusCode : 200;
  }
}
