export class AppSuccessResponse {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public total: number;
  public payload: any;
  public take: any;
  public page: any;
  public skip: any;

  constructor(
    message: string,
    payload: any,
    total?: number,
    take?: number,
    page?: number,
    skip?: number
  ) {
    this.success = true;
    this.statusCode = 200;
    this.message = message;
    this.payload = payload;
    this.total = total;
    this.take = take;
    this.page = page;
    this.skip = skip;
  }
}
