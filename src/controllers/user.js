import ServiceManager from '../services/ServiceManager';
import UsersCreate from '../services/user/UsersCreate';
import UsersUpdate from '../services/user/UsersUpdate';

export default {
  create: ServiceManager.makeServiceRunner(UsersCreate, (req) => req.body),
  update: ServiceManager.makeServiceRunner(UsersUpdate, (req) => ({...req.body, id: req.params.id})),
  delete: ()=>{/* TODO*/},
  list: ()=>{/* TODO*/},
  show: ()=>{/* TODO*/},
};
