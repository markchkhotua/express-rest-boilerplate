import ServiceBase from '../ServiceBase';
import models from '../../models';
import {userConstatns} from '../../constants';
import Exception from '../../exceptions/Exception';
import {dump} from '../../utils';
import exceptionCodes from '../../constants/exception';

/**
 * Service for creating users
 */
export default class UsersCreate extends ServiceBase {
    static validationRules = {
      data: ['required',
        {
          'nested_object':
                {
                  firstName: ['required', 'string'],
                  lastName: ['required', 'string'],
                  email: ['required', 'email'],
                  password: ['required', {min_length: 10}],
                  role: {one_of: [userConstatns.role.USER, userConstatns.role.ADMIN]},
                },
        },
      ],
    };

    /**
     * Service execution
     * @param {Object} data
     * @return {Object}
     */
    async execute(data) {
      const {User} = models;
      const userData = data.data;
      if (await User.findOne({where: {email: userData.email}})) {
        throw new Exception({
          code: exceptionCodes.NOT_UNIQUE,
          fields: {
            email: exceptionCodes.NOT_UNIQUE,
          },
        });
      }
      const user = await User.create(userData);
      return {data: dump.user.dump(user)};
    }
}
