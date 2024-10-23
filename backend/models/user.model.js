const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    email: {
      type: String,
      unique: true,
      require: true,
      trim: true,
      lowerCase: true,
    },
    password: { type: String, require: true, minlength: 6 },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
