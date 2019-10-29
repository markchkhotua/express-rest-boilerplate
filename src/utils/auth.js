import JWT from 'jsonwebtoken';
import {auth} from '../config';

export default {
  generateToken: (user) => {
    return JWT.sign({
      iss: auth.iss,
      user: user.id,
      role: user.role,
      expiresIn: 60 * 60 * 24 * 3, // expires in 3 days
    }, auth.jwtSecret);
  },
};
