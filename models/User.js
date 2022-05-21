import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


//FIXME: all of the following 3 functions are not working (WHY???)

// UserSchema.pre("save", async () => {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.createJWT = () => {
//   return jsonwebtoken.sign(
//     { userID: this._id, name: this.name },
//     process.env.JWT_SECRET
//   );
// };

// UserSchema.methods.comparePassword = async (inputPassword) => {
//   const isMatch = await bcrypt.compare(inputPassword,this.password);
//   return isMatch;
// }

export default mongoose.model('UserModel',UserSchema);
