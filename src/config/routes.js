export default {
  user: {
    root: '/user',
    create: '/create',
    update: '/update/:id',
    delete: '/delete/:id',
    list: '/list',
    show: '/show/:id',
  },
  auth: {
    root: '/auth',
    signIn: '/sign-in',
    checkToken: '/check-token',
  },
};
