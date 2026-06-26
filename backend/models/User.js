const { prisma } = require('../db');

function sanitizeUser(user) {
  if (!user) return null;
  const sanitized = { ...user };
  if (typeof sanitized.voterid === 'bigint') {
    sanitized.voterid = Number(sanitized.voterid);
  }
  sanitized.save = async function() { return this; };
  return sanitized;
}

const User = {
  async findOne(query) {
    if (query.aadharNumber !== undefined) {
      const user = await prisma.user.findUnique({
        where: { aadharNumber: query.aadharNumber }
      });
      return sanitizeUser(user);
    }
    if (query.voterid !== undefined) {
      try {
        const user = await prisma.user.findFirst({
          where: { voterid: BigInt(query.voterid) }
        });
        return sanitizeUser(user);
      } catch (err) {
        return null;
      }
    }
    return null;
  },

  async create(data) {
    const user = await prisma.user.create({
      data: {
        aadharNumber: data.aadharNumber,
        voterid: BigInt(data.voterid),
        isvoted: data.isvoted !== undefined ? data.isvoted : false,
        otp: data.otp !== undefined ? data.otp : 123456,
        name: data.name || null,
        email: data.email || null,
      }
    });
    return sanitizeUser(user);
  },

  findById(id) {
    const promise = (async () => {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) return null;
      const user = await prisma.user.findUnique({
        where: { id: numericId }
      });
      return sanitizeUser(user);
    })();
    
    promise.select = function(fields) {
      return promise;
    };
    
    return promise;
  },

  async findByIdAndUpdate(id, updateData, options) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const setClause = updateData.$set || updateData;
    const dataToUpdate = {};

    if (setClause.aadharNumber !== undefined) dataToUpdate.aadharNumber = setClause.aadharNumber;
    if (setClause.voterid !== undefined) dataToUpdate.voterid = BigInt(setClause.voterid);
    if (setClause.isvoted !== undefined) dataToUpdate.isvoted = setClause.isvoted;
    if (setClause.otp !== undefined) dataToUpdate.otp = setClause.otp;
    if (setClause.name !== undefined) dataToUpdate.name = setClause.name;
    if (setClause.email !== undefined) dataToUpdate.email = setClause.email;

    const user = await prisma.user.update({
      where: { id: numericId },
      data: dataToUpdate
    });
    return sanitizeUser(user);
  }
};

module.exports = User;