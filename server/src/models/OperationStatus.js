export default class OperationStatus {
  constructor(statusCode, status, data) {
    this.status = status;
    this.statusCode = statusCode;
    this.data = data;
  }

  status;
  statusCode;
  data;
}
