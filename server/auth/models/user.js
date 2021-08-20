import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: String,
    conversations: [{ id: String }],
    fName: String,
    lName: String,
    password: String,
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

const userModel = mongoose.model('user', userSchema);

export { userModel as user };
