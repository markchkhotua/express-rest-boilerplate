import ServiceBase from '../ServiceBase';
import models from '../../models';
import Exception from '../../exceptions/Exception';
import exceptionCodes from '../../constants/exception';
import {dump} from '../../utils';

/**
 * Service for updating users
 */
export default class UsersUpdate extends ServiceBase {
    static validationRules = {
      data: ['required', 'not_empty'],
      id: ['required', 'positive_integer'],
    };

    /**
     * Service execution
     * @param {Object} data
     * @return {Object}
     */
    async execute(data) {
      const {User} = models;
      const {data: userData, id} = data;
      if (!await User.findOne({where: {id}})) {
        throw new Exception({
          code: exceptionCodes.NOT_FOUND,
          fields: {
            email: exceptionCodes.NOT_FOUND,
          },
        });
      }
      const [, [user]] = await User.update(userData, {where: {id}, returning: true});
      return {data: dump.user.dump(user)};
    }
}
