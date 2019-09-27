import ServiceManager from '../services/ServiceManager';
import UsersCreate from '../services/user/UsersCreate';

export default {
  create: ServiceManager.makeServiceRunner(UsersCreate, (req) => req.body),
  update: ()=>{/* TODO*/},
  delete: ()=>{/* TODO*/},
  list: ()=>{/* TODO*/},
  show: ()=>{/* TODO*/},
};
