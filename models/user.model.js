const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: 'Email must not be empty',
      lowercase: true,
      validate: [
        {
          validator(value) {
            return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
          },
          message: 'Incorrect email.',
        },
      ],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

function generatePassword(salt, password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      config.crypto.iterations,
      config.crypto.length,
      config.crypto.digest,
      (err, key) => {
        if (err) return reject(err);
        resolve(key.toString('hex'));
      },
    );
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.crypto.length, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}

userSchema.methods.setPassword = async function setPassword(password) {
  this.salt = await generateSalt();
  this.passwordHash = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = async function (password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
