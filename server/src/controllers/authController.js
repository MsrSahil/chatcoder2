import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail.js";
import genToken from "../utils/auth.js";


export const Register = async (req, res, next) => {
  try {
    const { fullName, email, password, otp } = req.body;

    const fetchOtp = await OTP.findOne({ email });
    if (fetchOtp) {
      const isOtpValid = await bcrypt.compare(otp.toString(), fetchOtp.otp);
      if (!isOtpValid) {
        const error = new Error("Invalid OTP");
        error.statusCode = 409;
        return next(error);
      }
      await OTP.deleteOne({ email });
    } else {
      const error = new Error("OTP Expired !!! Try Again.");
      error.statusCode = 404;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const photo = `https://ui-avatars.com/api/?name=${fullName.charAt(
      0
    )}&background=random&color=fff&size=360`;

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      type: "normalUser",
      photo,
    });
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    console.log("Starting Login");
    const { email, password, otp } = req.body;
    if (!email || !password || !otp) {
      const error = new Error("Please fill all the fields");
      error.statusCode = 400;
      return next(error);
    }

    console.log({ email, password, otp });

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }
    console.log("User credentials verified");

    if (otp !== "N/A" && existingUser.TwoFactorAuth === "true") {
      const fetchOtp = await OTP.findOne({ email });
      if (!fetchOtp) {
        const error = new Error("OTP not found");
        error.statusCode = 404;
        return next(error);
      }
      console.log("Validating OTP");
      const isOtpValid = await bcrypt.compare(otp.toString(), fetchOtp.otp);
      if (!isOtpValid) {
        const error = new Error("Invalid OTP");
        error.statusCode = 401;
        return next(error);
      }

      await OTP.deleteOne({ email });
    }
    console.log("Login successful");
    genToken(existingUser, res);

    res.status(200).json({
      message: "Login successful",
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};

export const SendOTPForRegister = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      const error = new Error("Please fill all the fields");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      return next(error);
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    await OTP.create({
      email,
      otp: hashedOtp,
    });

    const subject = "Verify your email";

    const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                <div style="text-align: center; padding: 20px 0;">
                    <h2 style="color: #333;">ChatApp Pvt. Ltd.</h2>
                    <h1 style="color: #333; margin-bottom: 20px;">Email Verification Code</h1>
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
                            Your verification code is:
                        </p>
                        <h2 style="font-size: 32px; color: #4CAF50; letter-spacing: 5px; margin: 20px 0;">
                            ${otp}
                        </h2>
                        <p style="font-size: 14px; color: #999; margin-top: 20px;">
                            This code will expire in 10 minutes. Please do not share this code with anyone.
                        </p>
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 20px;">
                        If you didn't request this code, please ignore this email.
                    </p>
                </div>
            </div>
        `;

    sendEmail(email, subject, message);
    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const SendOTPForLogin = async (req, res, next) => {
  try {
    console.log("Sending OTP for Login");

    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Please fill all the fields");
      error.statusCode = 400;
      return next(error);
    }
    console.log({ email, password });

    console.log("Fetching existing user");

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }
    // console.log(existingUser);
    if (existingUser.TwoFactorAuth === "false") {
      req.body.otp = "N/A";
      console.log("Starting Login");
      return Login(req, res, next);
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    await OTP.create({
      email,
      otp: hashedOtp,
    });

    const subject = "2-Step verification code";

    const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                <div style="text-align: center; padding: 20px 0;">
                    <h2 style="color: #333;">ChatApp Pvt. Ltd.</h2>
                    <h1 style="color: #333; margin-bottom: 20px;">2-Step Verification Code</h1>
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
                            Your verification code is:
                        </p>
                        <h2 style="font-size: 32px; color: #4CAF50; letter-spacing: 5px; margin: 20px 0;">
                            ${otp}
                        </h2>
                        <p style="font-size: 14px; color: #999; margin-top: 20px;">
                            This code will expire in 10 minutes. Please do not share this code with anyone.
                        </p>
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 20px;">
                        If you didn't request this code, please ignore this email.
                    </p>
                </div>
            </div>
        `;

    sendEmail(email, subject, message);
    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const Logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    next(error);
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
    const fullName = req.body.name;
    const email = req.body.email;
    const Gid = req.body.id;

    //const { fullName: name, email, Gid: id } = req.body;

    if (!fullName || !email || !Gid) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedId = await bcrypt.hash(Gid, 10);
      const photo = `https://ui-avatars.com/api/?name=${fullName.charAt(
        0
      )}&background=random&color=fff&size=360`;

      const newUser = await User.create({
        fullName,
        email,
        googleId: hashedId,
        type: "googleUser",
        photo,
      });
      genToken(newUser, res);
      res.status(200).json({ message: "Login Sucessfully", data: newUser });
    } else if (existingUser && existingUser.type === "normalUser") {
      const hashedId = await bcrypt.hash(Gid, 10);

      existingUser.googleId = hashedId;
      existingUser.type = "googleUser";

      await existingUser.save();
      genToken(existingUser, res);

      res
        .status(200)
        .json({ message: "Login Sucessfully", data: existingUser });
    } else {
      const isVerified = await bcrypt.compare(Gid, existingUser.googleId);
      if (!isVerified) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return next(error);
      }

      genToken(existingUser, res);

      res
        .status(200)
        .json({ message: "Login Sucessfully", data: existingUser });
    }
  } catch (error) {
    next(error);
  }
};