import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

import {user as User, Sequelize} from '../models';
import {auth} from '../config';
import Exception from '../exceptions/Exception';
import {exceptionCodes, userConstants} from '../constants';
import {dump as dumpUtils} from '../utils';

const Op = Sequelize.Op;

passport.use(new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: auth.jwtSecret,
    },
    async (payload, done) => {
      const user = await User.findOne({
        where: {id: payload.user, status: {[Op.not]: userConstants.status.DELETED}},
        attributes: {exclude: ['updatedAt', 'password']},
      });
      if (!user) {
        return done(new Exception({
          code: exceptionCodes.NOT_AUTHORIZED,
          fields: {
          },
        }), false);
      }
      done(null, dumpUtils.user.dump(user));
    }
));
