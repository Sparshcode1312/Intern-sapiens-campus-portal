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
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server requests and tools such as Postman.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

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
    return;
  }

  const count = await User.countDocuments();

  if (count > 0) {
    console.log('Users already exist. Demo seeding skipped.');
    return;
  }

  const demoPassword = process.env.DEMO_PASSWORD;

  if (!demoPassword) {
    throw new Error(
      'DEMO_PASSWORD is required when SEED_DEMO_USERS=true'
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(demoPassword, salt);

  const users = [
    {
      name: 'John Centre',
      email: 'centre@sapiens.edu',
      password: hashedPassword,
      role: 'Centre Head',
      centreName: 'SGS Bharatpur',
      designationLabel: 'Centre Head - SGS Bharatpur',
    },
    {
      name: 'Jane Cluster',
      email: 'cluster@sapiens.edu',
      password: hashedPassword,
      role: 'Cluster Manager',
      centreName: 'North Region',
      designationLabel: 'Cluster Manager - North',
    },
    {
      name: 'Michael Director',
      email: 'director@sapiens.edu',
      password: hashedPassword,
      role: 'Director',
      centreName: 'HQ',
      designationLabel: 'Director',
    },
  ];

  await User.insertMany(users);
  console.log('Demo users seeded successfully.');
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