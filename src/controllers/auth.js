import ServiceManager from '../services/ServiceManager';
import AuthSignIn from '../services/auth/AuthSignIn';
import AuthCheckToken from '../services/auth/AuthCheckToken';

export default {
  signIn: ServiceManager.makeServiceRunner(AuthSignIn, (req) => req.user),
  checkToken: ServiceManager.makeServiceRunner(AuthCheckToken, (req) => req.user),
};
