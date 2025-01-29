const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: '', 
  },
  headline: {
    type: String,
    default: '', 
  },
  location: {
    type: String,
    default: '', 
  },

  about: {
    type: String,
    default: '',
    maxlength:1000 
  },

  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        default: '',
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        default: null, 
      },
      description: {
        type: String,
        default: '',
      },
    },
  ],

  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        default: '',
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        default: null, 
      },
      description: {
        type: String,
        default: '',
      },
    },
  ],

  // Skills
  skills: [
    {
      name: {
        type: String,
        required: true,
      },
      endorsements: {
        type: Number,
        default: 0, 
      },
    },
  ],

  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
  ],


  contactInfo: {
    phone: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    linkedIn: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
  },


  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
