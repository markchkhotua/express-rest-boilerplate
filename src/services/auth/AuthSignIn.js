import ServiceBase from '../ServiceBase';
import {dump as dumpUtil} from '../../utils';
import {authUtils} from '../../utils';
import Exception from '../../exceptions/Exception';
import exceptionCodes from '../../constants/exception';

/**
 * Service for authentication
 */
export default class AuthSignIn extends ServiceBase {
    static validationRules = {
      data: ['required',
        {
          'nested_object': {},
        },
      ],
    };

    /**
     * Service execution
     * @param {Object} data
     * @return {Object}
     */
    async execute(data) {
      try {
        const token = await authUtils.generateToken(data);
        return {token, user: dumpUtil.user.dump(data)};
      } catch (e) {
        throw new Exception({
          code: exceptionCodes.SERVER_ERROR,
          fields: {
          },
        });
      }
    }
}
