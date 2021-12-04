import * as moment from "moment";
import { MalformedRequestError } from "../errors";
import { cleanObject, toBool } from "../utils/util.function";
import { OrderOptions, RequestMethods } from "./../enums/index";
import { MALFORMED_REQUEST } from "./../errors/index";
import { IOptions } from "./../interfaces/option.interface";

export function RequestModifierMiddleware(req: any, res: any, next: Function) {
  const opts: string[] = [];
  const reqOpts: IOptions = {};

  let _req: any = {};

  if (req.method === RequestMethods.GET) {
    _req = req.query;
  } else if (req.method === RequestMethods.POST || RequestMethods.PUT) {
    _req = req.body;
  }

  if (_req.searchTerm) {
    reqOpts.searchTerm = _req.searchTerm.trim();
    opts.push("searchTerm");
  }

  if (_req.sort) {
    reqOpts.sort = _req.sort.trim();
    opts.push("sort");
  }

  if (_req.ids && Array.isArray(_req.ids)) {
    reqOpts.ids = _req.ids;
    opts.push("ids");
  }

  if (_req.between) {
    try {
      reqOpts.between = eval(_req.between);

      if (
        reqOpts.between.length === 2 &&
        moment(reqOpts.between[0], true).isValid() &&
        moment(reqOpts.between[1], true).isValid()
      ) {
        const start = new Date(reqOpts.between[0]);
        const end = new Date(reqOpts.between[1]);

        reqOpts.startDate = start;
        reqOpts.endDate = end;
      } else {
        throw new MalformedRequestError(MALFORMED_REQUEST, "Invalid Date Time");
      }

      opts.push("startDate");
      opts.push("endDate");
      opts.push("between");
    } catch (error) {
      delete _req.startDate;
      delete _req.endDate;
      delete _req.between;
      throw new MalformedRequestError(MALFORMED_REQUEST, "Invalid Date Time");
    }
  }

  if (_req.before) {
    try {
      if (moment(_req.before, true).isValid()) {
        reqOpts.before = new Date(_req.before);
      } else {
        throw new MalformedRequestError(MALFORMED_REQUEST, "Invalid Date Time");
      }
      opts.push("before");
    } catch (error) {
      delete _req.before;
      throw new MalformedRequestError(MALFORMED_REQUEST, "Invalid Date Time");
    }
  }

  if (_req.after) {
    try {
      if (moment(_req.after, true).isValid()) {
        reqOpts.after = new Date(_req.after);
      } else {
        throw new MalformedRequestError(MALFORMED_REQUEST, "Invalid Date Time");
      }

      opts.push("after");
    } catch (error) {
      delete _req.after;
      throw new MalformedRequestError(MALFORMED_REQUEST, "Invalid Date Time");
    }
  }

  if (_req.selects) {
    try {
      reqOpts.selects = eval(_req.selects);
      reqOpts.selects.splice(0, 0, "id");
      opts.push("selects");
    } catch (error) {
      delete _req.selects;
      throw new MalformedRequestError(MALFORMED_REQUEST, "Invalid Selects");
    }
  }

  if (_req.relations) {
    try {
      reqOpts.relations = eval(_req.relations);
      opts.push("relations");
    } catch (error) {
      delete _req.relations;
      throw new MalformedRequestError(MALFORMED_REQUEST, "Invalid relations");
    }
  }

  if (_req.order) {
    try {
      reqOpts.order = eval(_req.order);

      if (!Object.values(OrderOptions).includes(reqOpts.order[1])) {
        delete reqOpts.order;
      }
      opts.push("order");
    } catch (error) {
      delete _req.order;
      throw new MalformedRequestError(MALFORMED_REQUEST, "Invalid Order");
    }
  }
  if (_req?.take === "all") {
    delete _req?.take;
    _req.fetchAll = true;
  }

  if (_req.take) {
    try {
      reqOpts.take = Number(_req.take);
      if (isNaN(reqOpts.take)) {
        delete reqOpts.take;
        throw new MalformedRequestError(
          MALFORMED_REQUEST,
          "take have to be number"
        );
      }
      opts.push("take");
    } catch (error) {
      delete _req.take;
      throw new MalformedRequestError(
        MALFORMED_REQUEST,
        'take have to be a number or "all"'
      );
    }
  }

  if (_req.page) {
    try {
      if (isNaN(_req.page)) {
        delete _req.page;
        throw new MalformedRequestError(
          MALFORMED_REQUEST,
          "page have to be number"
        );
      }
      opts.push("page");
    } catch (error) {
      delete _req.page;
      throw new MalformedRequestError(
        MALFORMED_REQUEST,
        "page have to be number"
      );
    }
  }
  if (!_req.take) {
    reqOpts.take = 10;
  }

  if (!_req.page) {
    reqOpts.skip = 0;
  }

  if (_req.take && _req.page) {
    reqOpts.skip = _req.page === 1 ? 0 : (_req.page - 1) * _req.take;
    reqOpts.page = Number(_req.page);
  }

  if (_req.fetchAll) {
    try {
      reqOpts.take = "all";
      reqOpts.fetchAll = toBool(_req.fetchAll);
      opts.push("fetchAll");
      delete _req.fetchAll;
    } catch (error) {
      delete _req.fetchAll;
      throw new MalformedRequestError(
        MALFORMED_REQUEST,
        "accepted values = true/false"
      );
    }
  }

  if (_req.single) {
    try {
      reqOpts.single = toBool(_req.single);
      opts.push("single");
      delete _req.single;
    } catch (error) {
      delete _req.single;
      throw new MalformedRequestError(
        MALFORMED_REQUEST,
        "accepted values = true/false"
      );
    }
  }

  req.reqOptions = reqOpts;

  opts.map((opt) => {
    if (req.method === RequestMethods.GET) {
      if (Object.keys(req.query).includes(opt)) {
        delete _req[opt];
      }
    } else if (req.method === RequestMethods.POST || RequestMethods.PUT) {
      if (Object.keys(req.body).includes(opt)) {
        delete _req[opt];
      }
    }
  });

  req.reqPayloads = cleanObject(_req);
  const reqPayloads = cleanObject(_req);

  if (req.method === RequestMethods.POST || RequestMethods.PUT) {
    req.body = { ...reqPayloads };
  } else {
    req.query = { ...reqPayloads };
  }

  next();
}
