const { prisma } = require('../db');

function sanitizeNote(note) {
  if (!note) return null;
  const sanitized = { ...note };
  sanitized.save = async function() { return this; };
  return sanitized;
}

const Notes = {
  async find(query) {
    const notes = await prisma.notes.findMany();
    return notes.map(sanitizeNote);
  },

  async findOne(query) {
    if (query.name !== undefined) {
      const note = await prisma.notes.findUnique({
        where: { name: query.name }
      });
      return sanitizeNote(note);
    }
    return null;
  },

  async create(data) {
    const note = await prisma.notes.create({
      data: {
        name: data.name,
        party: data.party,
        voteCount: data.voteCount !== undefined ? data.voteCount : 0,
        adminId: data.adminId || null
      }
    });
    return sanitizeNote(note);
  },

  async findById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;
    const note = await prisma.notes.findUnique({
      where: { id: numericId }
    });
    return sanitizeNote(note);
  },

  async findByIdAndUpdate(id, updateData, options) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const setClause = updateData.$set || updateData;
    const dataToUpdate = {};

    if (setClause.name !== undefined) dataToUpdate.name = setClause.name;
    if (setClause.party !== undefined) dataToUpdate.party = setClause.party;
    if (setClause.voteCount !== undefined) dataToUpdate.voteCount = setClause.voteCount;
    if (setClause.adminId !== undefined) dataToUpdate.adminId = setClause.adminId;

    const note = await prisma.notes.update({
      where: { id: numericId },
      data: dataToUpdate
    });
    return sanitizeNote(note);
  },

  async findByIdAndDelete(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;
    const note = await prisma.notes.delete({
      where: { id: numericId }
    });
    return sanitizeNote(note);
  }
};

module.exports = Notes;
