import ServiceBase from '../ServiceBase';
import models from '../../models';
import Exception from '../../exceptions/Exception';
import exceptionCodes from '../../constants/exception';
import {dump} from '../../utils';

/**
 * Service for deleting users
 */
export default class UsersDelete extends ServiceBase {
    static validationRules = {
      id: ['required', 'positive_integer'],
    };

    /**
     * Service execution
     * @param {Object} data
     * @return {Object}
     */
    async execute(data) {
      const {User} = models;
      const {id} = data;
      if (!await User.findOne({where: {id}})) {
        throw new Exception({
          code: exceptionCodes.NOT_FOUND,
          fields: {
            email: exceptionCodes.NOT_FOUND,
          },
        });
      }
      const user = await User.destroy({where: {id}});
      return {data: dump.user.dumpDelete(user)};
    }
}
