import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
export class UserService {
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  static createAccount = async (data) => {
    const { email, name, password } = data;
    if (!email || !name || !password) {
      return { error: "Please fill all the fields", status: 400 };
    }

    if (name.length <= 4) {
      return { error: "Name should be atleat 4 characters", status: 400 };
    }

    if (!this.isValidEmail(email)) {
      return { error: "Email is not valid", status: 400 };
    }

    if (password.length <= 8) {
      return { error: "Password length should be more than 8 ", status: 400 };
    }

    const existedUser = await UserModel.findOne({ email });

    if (existedUser) {
      return { error: "Email already exsist", status: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return {};
  };

  static login = async (data) => {
    const { email, password } = data;

    const exisitingUser = await UserModel.findOne({ email });

    if (!exisitingUser) {
      return { error: "Password is not valid", status: 400 };
    }

    const comparPassword = await bcrypt.compare(
      password,
      exisitingUser.password,
    );
    if (!comparPassword) {
      return { error: "Password is not valid", status: 400 };
    }

    const tokenData = {
      email: exisitingUser.email,
      name: exisitingUser.name,
    };

    const token = await jsonwebtoken.sign(tokenData, process.env.JWT_SECRET);

    return {
      email: exisitingUser.email,
      name: exisitingUser.name,
      id: exisitingUser._id,
      token,  
    };
  };
}
