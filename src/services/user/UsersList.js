import ServiceBase from '../ServiceBase';
import models from '../../models';
import Exception from '../../exceptions/Exception';
import exceptionCodes from '../../constants/exception';
import {dump} from '../../utils';
import {userConstants} from '../../constants';

/**
 * Service for listing users
 */
export default class UsersUpdate extends ServiceBase {
    static validationRules = {
      firstName: 'string',
      lastName: 'string',
      role: {one_of: [userConstants.role.USER, userConstants.role.ADMIN]},
    };

    /**
     * Service execution
     * @param {Object} data
     * @return {Object}
     */
    async execute(data) {
      const {User} = models;
      const users = await User.findAll({where: {...data}});
      if (!users.length) {
        throw new Exception({
          code: exceptionCodes.NOT_FOUND,
          fields: {
            email: exceptionCodes.NOT_FOUND,
          },
        });
      }
      return {data: dump.user.dumpAll(users)};
    }
}
