import ServiceBase from '../ServiceBase';
import models from '../../models';
import Exception from '../../exceptions/Exception';
import exceptionCodes from '../../constants/exception';
import {dump} from '../../utils';

/**
 * Service for showing user
 */
export default class UsersUpdate extends ServiceBase {
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
      const user = await User.findOne({where: {id}});
      if (!user) {
        throw new Exception({
          code: exceptionCodes.NOT_FOUND,
          fields: {
            email: exceptionCodes.NOT_FOUND,
          },
        });
      }
      return {data: dump.user.dump(user)};
    }
}
