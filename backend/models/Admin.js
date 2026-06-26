const { prisma } = require('../db');

const Admin = {
  async findOne(query) {
    if (query.email !== undefined) {
      return await prisma.admin.findUnique({
        where: { email: query.email }
      }) || null;
    }
    return null;
  },

  async create(data) {
    return await prisma.admin.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });
  }
};

module.exports = Admin;