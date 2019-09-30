import ServiceManager from '../services/ServiceManager';
import UsersCreate from '../services/user/UsersCreate';
import UsersUpdate from '../services/user/UsersUpdate';
import UsersDelete from '../services/user/UsersDelete';
import UsersShow from '../services/user/UsersShow';
import UsersList from '../services/user/UsersList';

export default {
  create: ServiceManager.makeServiceRunner(UsersCreate, (req) => req.body),
  update: ServiceManager.makeServiceRunner(UsersUpdate, (req) => ({...req.body, id: req.params.id})),
  delete: ServiceManager.makeServiceRunner(UsersDelete, (req) => ({id: req.params.id})),
  show: ServiceManager.makeServiceRunner(UsersShow, (req) => ({id: req.params.id})),
  list: ServiceManager.makeServiceRunner(UsersList, (req) => ({...req.query})),
};
