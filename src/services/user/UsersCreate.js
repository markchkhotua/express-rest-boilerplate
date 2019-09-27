import ServiceBase from '../ServiceBase';
import user from '../../models';

/**
 * Service for creating users
 */
export default class UsersCreate extends ServiceBase {
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
    }

    /**
   * Service execution
   * @param {Object} data
   * @return {Promise<void>}
   */
    async execute(data) {
    }
}
