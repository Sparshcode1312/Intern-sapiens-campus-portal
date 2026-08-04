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
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('Blocked CORS origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
    },
    {
      name: 'Jane Cluster',
      email: 'cluster@sapiens.edu',
      role: 'Cluster Manager',
      centreName: 'North Region',
      designationLabel: 'Cluster Manager - North',
    },
    {
      name: 'Michael Director',
      email: 'director@sapiens.edu',
      role: 'Director',
      centreName: 'HQ',
      designationLabel: 'Director',
    },
  ];

  for (const user of users) {
    await User.updateOne(
      { email: user.email },
      {
        $set: {
          ...user,
          password: hashedPassword,
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
