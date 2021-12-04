import { AfterDate, BeforeDate, getEntityProperties } from "./util.function";
import { Between, FindManyOptions, FindOneOptions, Like, Raw } from "typeorm";
import { IOptions } from "../interfaces";
import { OrderOptions } from "../enums";

export const createTypeORMFindManyOptions = async (
  filters: any,
  options: IOptions,
  entity: any
): Promise<FindManyOptions> => {
  const properties = await getEntityProperties(entity);
  const opts: FindManyOptions = {};

  properties.ownColumns = [...properties.ownColumns, ...properties.relations];

  if (options.searchTerm) {
    opts.where = [];
    const where = [];
    properties.searchTerms.map((c) => {
      let criterias;

      //? Between
      if (options.between && options.startDate && options.endDate) {
        criterias = {
          createdAt: Between(options.startDate, options.endDate),
          [c]: Raw(
            
            (alias) =>
              `LOWER(${alias}) LIKE '%${options.searchTerm.toLowerCase()}%'`
          ),
        };
      }
      //? Before
      else if (options.before) {
        criterias = {
          createdAt: BeforeDate(options.before),
          [c]: Raw(
            (alias) =>
              `LOWER(${alias}) LIKE '%${options.searchTerm.toLowerCase()}%'`
          ),
        };
      }
      //? After
      else if (options.after) {
        criterias = {
          createdAt: AfterDate(options.after),
          [c]: Raw(
            (alias) =>
              `LOWER(${alias}) LIKE '%${options.searchTerm.toLowerCase()}%'`
          ),
        };
      }
      //? Others
      else {
        criterias = {
          [c]: Raw(
            (alias) =>
              `LOWER(${alias}) LIKE '%${options.searchTerm.toLowerCase()}%'`
          ),
        };
      }

      where.push(criterias);
    });

    opts.where = where;
  } else {
    opts.where = {};

    properties.ownColumns.map((c) => {
      if (Object.keys(filters).includes(c)) {
        opts.where[c] = filters[c];
      }
    });

    if (options.between && options.startDate && options.endDate) {
      opts.where.createdAt = Between(options.startDate, options.endDate);
    } else if (options.before) {
      opts.where.createdAt = BeforeDate(options.before);
    } else if (options.after) {
      opts.where.createdAt = AfterDate(options.after);
    }
  }

  if (options.selects && options.selects.length !== 1) {
    opts.select = options.selects;
  }

  if (options.relations && options.relations.length > 0) {
    opts.relations = options.relations;
  }

  if (options.order) {
    opts.order = {
      [options.order[0]]: options.order[1],
    };
  }  

  if (!options.fetchAll) {
    opts.take = +options.take;
    opts.skip = options.skip;
  }

  return opts;
};

export const createTypeORMFindOneOptions = async (
  filters: any,
  options: IOptions,
  entity: any
): Promise<FindOneOptions> => {
  const properties = await getEntityProperties(entity);
  const opts: FindOneOptions = {};

  properties.ownColumns = [...properties.ownColumns, ...properties.relations];

  opts.where = {};

  properties.ownColumns.map((c) => {
    if (Object.keys(filters).includes(c)) {
      opts.where[c] = filters[c];
    }
  });

  if (options.selects && options.selects.length !== 1) {
    opts.select = options.selects;
  }

  if (options.relations && options.relations.length > 0) {
    opts.relations = options.relations;
  }

  return opts;
};

export const createTypeORMFindByIdOptions = async (
  id: string,
  options: IOptions
): Promise<FindOneOptions> => {
  const opts: FindOneOptions = {};

  opts.where = typeof id === "string" ? { id } : id;

  if (options.selects && options.selects.length !== 1) {
    opts.select = options.selects;
  }

  if (options.relations && options.relations.length > 0) {
    opts.relations = options.relations;
  }

  return opts;
};
