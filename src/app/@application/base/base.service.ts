import { NotFoundException } from "@nestjs/common";
import {
  FindManyOptions,
  FindOneOptions,
  InsertResult,
  Repository,
} from "typeorm";
import { QueryError } from "../errors";
import { IOptions } from "../interfaces";
import {
  createTypeORMFindManyOptions,
  createTypeORMFindOneOptions,
} from "../utils/service.utils";
import { relationBuilder, selectArrayBuilder } from "../utils/util.function";
import {
  IMessageOnlyResponse,
  IGetAllFromDBResponse,
} from "./../interfaces/index";

export abstract class BaseService<Entity> extends Repository<Entity> {
  repository: Repository<Entity>;
  entityName: string;

  constructor(repository: Repository<Entity>, entityName: string) {
    super();
    this.repository = repository;
    this.entityName = entityName;
  }

  async insertIntoDB(payload: Entity): Promise<Entity> {
    console.log("Calling ~ base.service.ts ~ ~ insertIntoDB ~~~~~~");
    try {
      const result: InsertResult = await this.repository.insert(payload);
      return this.repository.findOne(result.identifiers[0].id).catch((err) => {
        return err;
      });
    } catch (error) {
      return error;
    }
  }

  async bulkInsertIntoDB(payload: Entity[]): Promise<IMessageOnlyResponse> {
    console.log("Calling ~ base.service.ts ~ ~ bulkInsertIntoDB ~~~~~~");
    try {
      const result: InsertResult = await this.repository.insert(payload);
      return {
        message: `${this.entityName} data bulk insert success`,
        ids: result.identifiers,
      };
    } catch (error) {
      return error;
    }
  }

  async updateIntoDB(id: string, payload: Entity): Promise<Entity> {
    console.log("Calling ~ base.service.ts ~ ~ updateIntoDB ~~~~~~");
    try {
      await this.repository.update(id, payload);
      return this.repository.findOne(id).catch((err) => {
        return err;
      });
    } catch (error) {
      return error;
    }
  }

  async deleteFromDB(id: string): Promise<IMessageOnlyResponse> {
    console.log("Calling ~ base.service.ts ~ ~ deleteFromDB ~~~~~~");
    try {
      await this.repository.delete(id).catch((err) => {
        return err;
      });
      return { message: `${this.entityName} data successfully deleted`, id };
    } catch (error) {
      return error;
    }
  }

  async deleteByCriteriaFromDB(
    entity: Entity | Entity[] | any
  ): Promise<IMessageOnlyResponse> {
    console.log("Calling ~ base.service.ts ~ ~ deleteByCriteriaFromDB ~~~~~~");
    try {
      await this.repository.delete(entity).catch((err) => {
        return err;
      });
      return { message: `${this.entityName} data successfully deleted` };
    } catch (error) {
      return error;
    }
  }

  async bulkUpdateIntoDB(
    reqOptions: IOptions,
    entity: Entity
  ): Promise<IMessageOnlyResponse> {
    console.log("Calling ~ base.service.ts ~ ~ bulkUpdateIntoDB ~~~~~~");
    try {
      if (!reqOptions.ids) {
        throw new QueryError(`${this.entityName} ids not provided`);
      }
      await this.repository.update(reqOptions.ids, entity).catch((err) => {
        return err;
      });
      return {
        message: `${this.entityName} bulk update success`,
        ids: reqOptions.ids,
      };
    } catch (error) {
      return error;
    }
  }

  async bulkDeleteFromDB(reqOptions: IOptions): Promise<IMessageOnlyResponse> {
    try {
      console.log("Calling ~ base.service.ts ~ ~ bulkDeleteFromDB ~~~~~~");
      if (!reqOptions.ids) {
        throw new QueryError(`${this.entityName} ids not provided`);
      }
      await this.repository.delete(reqOptions.ids).catch((err) => {
        return err;
      });
      return {
        message: `${this.entityName} bulk delete success`,
        ids: reqOptions.ids,
      };
    } catch (error) {
      return error;
    }
  }

  async getByIdFromDB(id: string): Promise<Entity> {
    try {
      return this.repository.findOne(id).catch((err) => {
        return err;
      });
    } catch (error) {
      return error;
    }
  }

  async getByCriteriaFromDB(
    criteria: Entity,
    options: IOptions
  ): Promise<Entity> {
    console.log("Calling ~ base.service.ts ~ ~ getByCriteriaFromDB ~~~~~~");
    try {
      const opts: FindOneOptions = await createTypeORMFindOneOptions(
        criteria,
        options,
        this.entityName
      );
      const entity = await this.repository.findOne(opts).catch((err) => {
        return err;
      });
      return entity;
    } catch (error) {
      return error;
    }
  }



  async findByMultipleIds(id: string[], relations?: string[]): Promise<any> {
    console.log('Call from Base Service - findByMultipleIds');

    try {
      console.log("🚀 ~ file: base.service.ts ~ line 410 ~ BaseService<Entity> ~ findByMultipleIds ~ id", id)
      id = typeof id === 'string' ? JSON.parse(id) : id;
      const entityAlias = this.repository?.metadata?.tableMetadataArgs?.name;
      let select: string[], order;
      const options: FindOneOptions = {};
      if (options?.select) {
        select = await selectArrayBuilder(entityAlias, options.select);
      }
      const qb = this.repository.manager
        .getRepository(this.repository?.metadata?.target)
        .createQueryBuilder(entityAlias);
      options ? qb.where(options) : null;
      id ? qb.whereInIds(id) : null;
      select ? qb.select(select) : null;
      if (relations) {
        await relationBuilder(qb, entityAlias, relations);
      }
      const data = await qb.getMany();
      return data || new NotFoundException('no data found with this id 😭');
    } catch (error) {
      return error;
    }
  }

  async getAllFromDB(
    filters: Entity,
    options: IOptions
  ): Promise<IGetAllFromDBResponse<Entity>> {
    console.log("Calling ~ base.service.ts ~ ~ getAllFromDB ~~~~~~");
    try {
      let result = { data: null, total: 0, take: null, page: null, skip: null };

      if (options.single) {
        const opts: FindOneOptions = await createTypeORMFindOneOptions(
          filters,
          options,
          this.entityName
        );

        result.data = await this.repository.findOne(opts).catch((err) => {
          return err;
        });
      } else {
        const opts: FindManyOptions = await createTypeORMFindManyOptions(
          filters,
          options,
          this.entityName
        );

        const res = await this.repository.findAndCount(opts).catch((err) => {
          return err;
        });

        if (res.length === 2) {
          result.data = res[0];
          result.total = res[1];
          result.take = options.take;
          result.page = options.page;
          result.skip = options.skip;
        }

        return result;
      }
    } catch (error) {
      return error;
    }
  }
}
