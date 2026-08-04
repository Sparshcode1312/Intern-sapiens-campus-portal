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
  centreName: { type: String }, // e.g. "SGS Bharatpur"
  designationLabel: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
