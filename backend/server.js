const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/User');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://intern-sapiens-campus-portal.vercel.app',
];

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sapiens Group Campus Portal API is running',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
  });
});

const PORT = process.env.PORT || 5000;
const seedUsers = async () => {
  if (process.env.SEED_DEMO_USERS !== 'true') {
    console.log('Demo user seeding disabled.');
    return;
  }

  const demoPassword = process.env.DEMO_PASSWORD || 'password123';
  const hashedPassword = await bcrypt.hash(demoPassword, 10);

  const users = [
    {
      name: 'John Centre',
      email: 'centre@sapiens.edu',
      role: 'Centre Head',
      centreName: 'SGS Bharatpur',
      designationLabel: 'Centre Head - SGS Bharatpur',
      customPassword: 'password123',
    },
    {
      name: 'Jane Cluster',
      email: 'cluster@sapiens.edu',
      role: 'Cluster Manager',
      centreName: 'North Region',
      designationLabel: 'Cluster Manager - North',
      customPassword: 'password123',
    },
    {
      name: 'Michael Director',
      email: 'director@sapiens.edu',
      role: 'Director',
      centreName: 'HQ',
      designationLabel: 'Director',
      customPassword: 'password123',
    },
    {
      name: 'Regional Head',
      email: 'regional@sapiens.edu',
      role: 'Regional Head',
      centreName: 'North Region',
      designationLabel: 'Regional Head - North',
      customPassword: 'password123',
    },
    {
      name: 'HQ Admin',
      email: 'hq@sapiens.edu',
      role: 'HQ',
      centreName: 'HQ',
      designationLabel: 'HQ Administrator',
      customPassword: 'hq@admin123',
    },
    {
      name: 'Director Console Admin',
      email: 'console@sapiens.edu',
      role: 'DirectorConsole',
      centreName: 'HQ',
      designationLabel: 'Director Console Admin',
      customPassword: 'console@admin123',
    },
  ];

  for (const user of users) {
    const pwdToHash = user.customPassword || demoPassword;
    const pwdHash = await bcrypt.hash(pwdToHash, 10);
    const { customPassword, ...userData } = user;

    await User.updateOne(
      { email: user.email },
      {
        $set: {
          ...userData,
          password: pwdHash,
        },
      },
      { upsert: true }
    );
  }

  console.log('Demo users created or updated successfully.');
};


  
    

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is missing');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is missing');
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

    await seedUsers();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error.message);
    process.exit(1);
  }
};

startServer();
