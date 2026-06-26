const bcrypt = require('bcryptjs');
const { prisma } = require('./db');

async function main() {
  console.log('Starting seed...');

  // Clean up existing data
  await prisma.notes.deleteMany();
  await prisma.user.deleteMany();
  await prisma.admin.deleteMany();

  console.log('Cleaned up existing data.');

  // Create an Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.create({
    data: {
      name: 'Super Admin',
      email: 'admin@gov.in',
      password: hashedPassword,
    },
  });

  console.log(`Created admin: ${admin.email}`);

  // Create Notes (Candidates/Parties)
  const notesData = [
    { name: 'Candidate A', party: 'Party Alpha', adminId: admin.id },
    { name: 'Candidate B', party: 'Party Beta', adminId: admin.id },
    { name: 'Candidate C', party: 'Party Gamma', adminId: admin.id },
    { name: 'NOTA', party: 'None of the above', adminId: admin.id },
  ];

  for (const note of notesData) {
    await prisma.notes.create({ data: note });
  }

  console.log('Created Candidates/Parties.');

  // Create Users (Voters)
  const usersData = [
    {
      aadharNumber: '123456789012',
      voterid: 1000000001n,
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      aadharNumber: '987654321098',
      voterid: 1000000002n,
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  ];

  for (const user of usersData) {
    const hashedAadhar = await bcrypt.hash(user.aadharNumber, 10);
    await prisma.user.create({ 
      data: {
        ...user,
        aadharNumber: hashedAadhar
      } 
    });
  }

  console.log('Created Voters.');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
