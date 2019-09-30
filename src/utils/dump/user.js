/**
 * Dumping user data to explicitly return to client only data the he needs
 */
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
  dumpAll: (data) => {
    return data.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
    }));
  },
  dumpDelete: (number) => {
    return {
      deleted: number,
    };
  },
};
