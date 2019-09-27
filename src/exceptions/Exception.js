import pointer from 'json-pointer';
import rename from 'rename-keys';
import {exceptionCodes} from '../constants';

/**
 * Custom exception class
 */
export default class Exception extends Error {
  /**
   * Constructor with throwed error data
   * @param {Object} data
   */
  constructor(data) {
    super();
    if (!data.fields) throw new Error(exceptionCodes.FIELDS_REQUIRED);
    if (!data.code) throw new Error(exceptionCodes.MESSAGE_REQUIRED);

    const fields = pointer.dict(data.fields);

    this.fields = rename(fields, (str) => {
      return str.substr(1);
    });

    this.code = data.code;
    this.message = data.message;
  }

  /**
   * To hash
   * @return {{code: (Object.code|*), fields: {}}}
   */
  toHash() {
    return {
      fields: this.fields,
      code: this.code,
    };
  }
}
