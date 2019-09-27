import ServiceBase from '../ServiceBase';
import {User} from '../../models';

/**
 * Service for creating users
 */
export default class UsersUpdate extends ServiceBase {
    static validationRules = {
      data: [
        'required',
        {
          'nested_object': {
            email: ['required', 'email', 'to_lc'],
            password: 'required',
          },
        },
      ],
    };

    /**
   * Service execution
   * @param {Object} data
   * @return {Promise<void>}
   */
    async execute(data) {
    }
}
