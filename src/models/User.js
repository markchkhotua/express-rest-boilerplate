import bcrypt from 'bcrypt';
import {userConstants} from '../constants';

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
      type: DataTypes.ENUM(userConstants.role.ADMIN, userConstants.role.USER),
      notEmpty: true,
      allowNull: false,
      defaultValue: userConstants.role.USER,
    },
    status: {
      type: DataTypes.ENUM(userConstants.status.ACTIVE, userConstants.status.DISABLED,
          userConstants.status.PENDING, userConstants.status.DELETED),
      defaultValue: userConstants.status.PENDING,
    },
  });

  User.beforeCreate((user) => {
    const {password} = user;
    user.password = bcrypt.hashSync(password, 10);
  });

  return User;
};

