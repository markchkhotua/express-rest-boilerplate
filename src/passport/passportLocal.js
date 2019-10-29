import passport from 'passport';
import bcrypt from 'bcrypt';
import {Strategy} from 'passport-local';
import {user as User, Sequelize} from '../models';
import {exceptionCodes, userConstants} from '../constants';
import {dump as dumpUtils} from '../utils';
import Exception from '../exceptions/Exception';

const Op = Sequelize.Op;

passport.use(new Strategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({
        where: {email, status: {[Op.not]: userConstants.status.DELETED}},
        attributes: {exclude: ['updatedAt']},
      });
      const userPassword = (user && user.password) || '';
      const isMatch = await bcrypt.compare(password, userPassword);
      if (!user || !isMatch) {
        return done(new Exception({
          code: exceptionCodes.EMAIL_OR_PASSWORD_NOT_CORRECT,
          fields: {
          },
        }), false);
      }
      return done(null, dumpUtils.user.dump(user));
    }
));
