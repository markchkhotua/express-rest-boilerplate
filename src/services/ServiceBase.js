import LIVR from 'livr';
import Exception from '../exceptions/Exception';
import exceptionCodes from '../constants/exception';

/**
 * Base class for all services
 */
export default class ServiceBase {
  /**
   * Base class constructor
   * @param {Object} args - arguments, passed to service constructor
   */
  constructor(args) {
    if (!args.context) throw new Error(exceptionCodes.CONTEXT_REQUIRED);
    this.context = args.context;
  }

  /**
   * Run function
   * @param {Object} params
   * @return {Promise<*>}
   */
  async run(params) {
    if (typeof this.checkPermissions === 'function') {
      await this.checkPermissions();
    }

    const cleanParams = await this.validate(params);

    return this.execute(cleanParams);
  }

  /**
   * Validation function
   * @param {Object} data
   * @return {Promise<*>}
   */
  validate(data) {
    const validator = this.constructor.cachedValidator ||
            new LIVR.Validator(this.constructor.validationRules).prepare();

    this.constructor.cachedValidator = validator;

    return this._doValidationWithValidator(data, validator);
  }

  /**
   * Custom validation function
   * @param {Object} data - data to validate
   * @param {Object} rules - validation rules
   * @return {Promise<*>}
   */
  doValidation(data, rules) {
    // You can use this in overriden "validate" method
    const validator = new LIVR.Validator(rules).prepare();

    return this._doValidationWithValidator(data, validator);
  }

  /**
   * Validation with validtor function
   * @param {Object} data - data to validate
   * @param {Object} validator
   * @return {Promise<*>}
   */
  async _doValidationWithValidator(data, validator) {
    const result = validator.validate(data);

    if (!result) {
      throw new Exception({
        code: exceptionCodes.FORMAT_ERROR,
        fields: validator.getErrors(),
      });
    }

    return result;
  }
}
