const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedUsers = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/sapiens-portal');
    console.log('MongoDB Connected for Seeding');

    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

   const users = [
  {
    name: "John Centre",
    email: "centre@sapiens.edu",
    password,
    role: "Centre Head",
    centreName: "SGS Bharatpur",
    designationLabel: "Centre Head - SGS Bharatpur",
  },
  {
    name: "Jane Cluster",
    email: "cluster@sapiens.edu",
    password,
    role: "Cluster Manager",
    centreName: "North Region",
    designationLabel: "Cluster Manager - North",
  },
  {
    name: "Regional Head",
    email: "regional@sapiens.edu",
    password,
    role: "Regional Head",
    centreName: "North Region",
    designationLabel: "Regional Head - North",
  },
];

    await User.insertMany(users);
    console.log('Users Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
