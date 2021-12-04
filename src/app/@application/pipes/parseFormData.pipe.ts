import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { deepParseJson } from 'deep-parse-json';
import * as _ from 'lodash';

type TParseFormDataOptions = {
  except?: string[];
};

export class ParseFormDataPipe implements PipeTransform {
  constructor(private options?: TParseFormDataOptions) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    const { except } = this.options;
    const serializedValue = value;
    const originProperties = {};
    if (except?.length) {
      _.merge(originProperties, _.pick(serializedValue, ...except));
    }
    const deserializedValue = deepParseJson(value);
    console.log(`deserializedValue`, deserializedValue);
    return { ...deserializedValue, ...originProperties };
  }
}
