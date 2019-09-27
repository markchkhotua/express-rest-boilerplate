import {service as serviceUtils} from '../utils';
import {consoleLogger} from '../utils';

/**
 * Service manager
 */
class ServiceManager {
  /**
     * Service manager constructor
     * @param {function} defaultParamsBuilder
     * @param {function} defaultContextBuilder
     * @param {function} defaultLogger
     */
  constructor({
    defaultParamsBuilder = () => ({}),
    defaultContextBuilder = (req) => cloneDeep(req.session && req.session.context ? req.session.context : {}),
    defaultLogger = consoleLogger,
  }) {
    console.log('qwe');

    this.defaultParamsBuilder = defaultParamsBuilder;
    this.defaultContextBuilder = defaultContextBuilder;
    this.defaultLogger = defaultLogger;
  }

  /**
     * Service runner
     * @param {class} ServiceClass
     * @param {Object} context
     * @param {Object} params
     * @param {function} logger
     * @return {Promise<*|undefined>}
     */
  runService(ServiceClass, {context = {}, params = {}, logger = this.defaultLogger}) {
    return serviceUtils.runService(ServiceClass, {context, params, logger});
  }

  /**
     * Service runner maker
     * @param {class} ServiceClass
     * @param {function} paramsBuilder
     * @param {function} contextBuilder
     * @param {function} logger
     * @return {function(*=, *=): Promise<*|undefined>}
     */
  makeServiceRunner(
      ServiceClass,
      paramsBuilder = this.defaultParamsBuilder,
      contextBuilder = this.defaultContextBuilder,
      logger = this.defaultLogger
  ) {
    return serviceUtils.makeServiceRunner(ServiceClass, paramsBuilder, contextBuilder, logger);
  }

  /**
     * Promise renderer
     * @param {Object} req
     * @param {Object} res
     * @param {Object} promise
     * @param {function} logger
     * @return {Promise<*|undefined>}
     */
  renderPromiseAsJson(req, res, promise, logger = this.defaultLogger) {
    return serviceUtils.renderPromiseAsJson(req, res, promise, logger);
  }
}

/**
 * Deep clone of an object
 * @param {Object} data
 * @return {any}
 */
function cloneDeep(data) {
  return JSON.parse(JSON.stringify(data));
}

export default new ServiceManager();
