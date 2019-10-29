import ServiceBase from '../ServiceBase';
import {dump as dumpUtil} from '../../utils';

/**
 * Service for authentication
 */
export default class AuthSignIn extends ServiceBase {
    static validationRules = {
    };

    /**
     * Service execution
     * @param {Object} data
     * @return {Object}
     */
    async execute(data) {
      return {user: dumpUtil.user.dump(data)};
    }
}
