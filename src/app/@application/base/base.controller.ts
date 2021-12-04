import { Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RequestOptions, RequestParams, RequestPayloads } from "../decorators";
import { IOptions, IParams } from "../interfaces";

export abstract class BaseController<Entity> {
  _service: any;

  constructor(private _modelService: any) {
    this._service = this._modelService;
  }

  @Get()
  async get(
    @RequestOptions() reqOptions: IOptions,
    @RequestPayloads() reqPayloads: any
  ): Promise<Entity[] | Entity> {
    const resData = this._service.getAllFromDB(reqPayloads, reqOptions);
    return this._service.getAllFromDB(reqPayloads, reqOptions);
  }

  @Get(":id")
  async getById(@RequestParams() reqParams: IParams): Promise<Entity> {
    return this._service.getByIdFromDB(reqParams.id);
  }

  @Post()
  async post(
    @RequestOptions() reqOptions: IOptions,
    @RequestPayloads() reqPayloads: Entity
  ): Promise<any> {
    return this._service.insertIntoDB(reqPayloads);
  }

  @Put("bulk-update")
  async bulkUpdate(
    @RequestOptions() reqOptions: IOptions,
    @RequestPayloads() reqPayloads: Entity
  ): Promise<any> {
    return this._service.bulkUpdateIntoDB(reqOptions, reqPayloads);
  }

  @Put(":id")
  async put(
    @RequestPayloads() user: Entity,
    @Param("id") id: string
  ): Promise<any> {
    return this._service.updateIntoDB(id, user);
  }

  @Delete("bulk-delete")
  async bulkDelete(@RequestOptions() reqOptions: IOptions): Promise<any> {
    return this._service.bulkDeleteFromDB(reqOptions);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<any> {
    return this._service.deleteFromDB(id);
  }
}
