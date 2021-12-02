import crypto from 'crypto';

function hashGenerator(plainTextPassword, salt) {
  return crypto.pbkdf2Sync(plainTextPassword, salt, 10000, 64, 'sha256').toString('hex')
}

export function passwordGenerator(plainTextPassword) {
  const salt = crypto.randomBytes(32).toString("hex")
  const hash = hashGenerator(plainTextPassword, salt)
  return {
    salt, hash
  }
}

export function validatePassword(password, hash, salt) {
  const verifyHash = hashGenerator(password, salt)
  return hash === verifyHash
}