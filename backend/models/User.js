const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: [
      'Centre Head', 'Cluster Manager', 'Department Head', 
      'Regional Head', 'Director', 'Chairperson', 
      'Purchase Manager', 'Accounts'
    ],
    required: true 
  },
  centreName: {
  type: String,
  required: true,
  trim: true,
  enum: [
    'RIET',
    'SHS Dhawas',
    'SGS Bharatpur',
    'SJS Gandhipath',
    'SJS Hawa Sadak',
  ],
},
  designationLabel: {
  type: String,
  trim: true,
},
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
