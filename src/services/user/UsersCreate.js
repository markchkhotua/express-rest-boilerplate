import ServiceBase from '../ServiceBase';
import {User} from '../../models';
import {userConstatns} from '../../constants';
import Exception from '../../exceptions/Exception';
import {dump} from '../../utils';
import exceptionCodes from '../../constants/exception';

/**
 * Service for creating users
 */
export default class UsersCreate extends ServiceBase {
    static validationRules = {
      firstName: 'required',
      lastName: 'required',
      email: ['required', 'email'],
      password: ['required', {min_length: 10}],
      role: {one_of: [userConstatns.role.USER, userConstatns.role.ADMIN]},
    };

    /**
   * Service execution
   * @param {Object} data
   * @return {Object}
   */
    async execute(data) {
      if (await User.findOne({where: {id: data.id}})) {
        throw new Exception({
          code: exceptionCodes.NOT_UNIQUE,
          fields: {
            email: exceptionCodes.NOT_UNIQUE,
          },
        });
      }
      const user = User.create(data);
      return {data: dump.user.dump(user)};
    }
}
