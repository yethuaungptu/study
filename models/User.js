var mongoose = require('mongoose'); //mongodb module
var bcrypt = require('bcrypt-nodejs');
//Define a schama
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true //remove both-side with space
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role:{
    type: String,
    default: 'USER'
  },
  updated:{
    type: Date,
    default:Date.now
  },
  instered:{
    type: Date,
    default:Date.now
  },
  updatedBy:{
    type: String
  },
  insteredBy:{
    type: String
  }
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8),null);
  next();
});

UserSchema.statics.compare = function (cleartext,encrypted) {
  return bcrypt.compareSync(cleartext,encrypted);
};
module.exports =mongoose.model('Users',UserSchema);
