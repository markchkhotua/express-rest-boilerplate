import {inspect} from 'util';
import Exception from '../exceptions/Exception';
import consoleLogger from './consoleLogger';

const runService = async (ServiceClass, {context = {}, params = {}, logger = consoleLogger}) => {
  const logRequest = (type, result, startTime) => {
    logger(type, {
      service: ServiceClass.name,
      runtime: Date.now() - startTime,
      params: inspect(params, {showHidden: false, depth: null}),
      result,
    });
  };

  const startTime = Date.now();

  try {
    const result = await new ServiceClass({context}).run(params);

    logRequest('info', JSON.stringify(result), startTime);

    return result;
  } catch (error) {
    const type = error instanceof Exception ? 'info' : 'error';

    logRequest(type, error, startTime);

    throw error;
  }
};


const makeServiceRunner = (serviceClass, paramsBuilder, contexBuilder, logger = consoleLogger) => {
  return async function serviceRunner(req, res) {
    const resultPromise = runService(serviceClass, {
      logger,
      params: paramsBuilder(req, res),
      context: contexBuilder(req, res),
    });

    return renderPromiseAsJson(req, res, resultPromise, logger);
  };
};


const renderPromiseAsJson = async (req, res, promise, logger = consoleLogger) => {
  try {
    const data = await promise;

    data.status = 1;

    return res.send(data);
  } catch (error) {
    /* istanbul ignore next */
    if (error instanceof Exception) {
      res.send({
        status: 0,
        error: error.toHash(),
      });
    } else {
      logger(
          'error',
          {
            'REQUEST_URL': req.url,
            'REQUEST_PARAMS': req.params,
            'REQUEST_BODY': req.body,
            'ERROR_STACK': error.stack,
          }
      );

      res.send({
        status: 0,
        error: {
          code: 'SERVER_ERROR',
          message: 'Please, contact your system administartor!',
        },
      });
    }
  }
};


export default {
  makeServiceRunner,
  runService,
  renderPromiseAsJson,
};
