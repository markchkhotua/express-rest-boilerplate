export default {
  dump: (data) => {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      status: data.status,
    };
  },
};
