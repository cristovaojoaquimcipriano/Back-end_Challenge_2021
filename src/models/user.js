const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  name: {
    type: { title: String, first: String, last: String },
    required: true,
  },
  location: {
    type: {
      street: { type: { number: Number, name: String } },
      city: String,
      state: String,
      postcode: String,
      coodinates: { latitude: String, longitude: String },
      timezone: {
        offset: String,
        description: String,
      },
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  login: {
    type: {
      uuid: String,
      username: String,
      password: String,
      salt: String,
      md5: String,
      sha1: String,
      sha256: String,
    },
  },
  dob: {
    type: {
      date: Date,
      age: Number,
    },
  },
  registered: {
    type: {
      date: Date,
      age: Number,
    },
  },
  phone: String,
  cell: String,
  id: {
    type: { name: String, value: String },
  },
  picture: {
    type: { large: String, medium: String, thumbnail: String },
  },
  nat: String,
  imported_t: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    enum: ["draft", "trash", "published"],
    default: "published",
  },
});

module.exports = mongoose.model("user", userSchema);
