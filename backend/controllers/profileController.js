const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");

exports.changePassword = async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid user" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.oldpassword,
    user.password
  );
  
  if (isPasswordValid) {
    const newPassword = await bcrypt.hash(req.body.newpassword, 10);
    await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { password: newPassword }
    );

    return res.json({ status: "ok", message: "Password changed successfully" });
  } else {
    return res.json({ status: "error", error: "Incorrect old password" });
  }
};

// exports.updateProfile = async (req, res) => {
//   try {
//     await UserModel.findOneAndUpdate(
//       { email: req.body.email },
//       { name: req.body.newName }
//     );
//     res.json({ status: "ok", message: "Profile updated successfully" });
//   } catch (err) {
//     res.json({ status: "error", error: "Failed to update profile" });
//   }
// };

exports.user_name = async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });
  if (user) {
    const name = req.body.newName;
    //  console.log(req.body.email)
    const uemail = req.body.email
    await UserModel.findOneAndUpdate({ email: uemail }, { name: name });
    return res.json({ status: "ok" });
  } else {
    return res.json({ status: "Error" });
  }
};