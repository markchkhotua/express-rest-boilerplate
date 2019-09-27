import bcrypt from 'bcrypt';
import {userConstatns} from '../constants';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(userConstatns.role.ADMIN, userConstatns.role.USER),
      notEmpty: true,
      allowNull: false,
      defaultValue: userConstatns.role.USER,
    },
    status: {
      type: DataTypes.ENUM(userConstatns.status.ACTIVE, userConstatns.status.DISABLED, userConstatns.status.PENDING),
      defaultValue: userConstatns.status.PENDING,
    },
  });

  User.beforeCreate((user) => {
    const {password} = user;
    user.password = bcrypt.hashSync(password, 10);
  });

  return User;
};

