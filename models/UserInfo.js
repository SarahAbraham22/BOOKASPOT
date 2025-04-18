import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    conventionCenter: { type: String, required: true },
    capacity: { type: Number, required: true },
    contact: { type: String, required: true },
    cost: { type: String, required: true },
    gmap: { type: String, required: true },
    address: { type: String, required: true },
    typeofevent: { type: String, required: true },
  },
  { timestamps: true }
);

const UserInfo = mongoose.models?.UserInfo || mongoose.model("UserInfo", UserInfoSchema);
export default UserInfo;
