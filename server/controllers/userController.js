import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";



//Signup new user
export const signup = async (req, res) => {
    const {email, fullName, password, bio} = req.body;

    try {
        if(!fullName || !email || !password || !bio){
            return res.json({success: false, message: "All fields are required"});
        }
        const user = await User.findOne({email})

        if(user){
            return res.json({success: false, message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email, fullName, password: hashedPassword, bio
        });

        const token = generateToken(newUser._id);
        res.json({success: true, userData: newUser, message: "User created successfully", token});

    } catch (error) {

        console.log(error.message);
        res.json({success: false, message: error.message});

    }
}


//controller for login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if(!isPasswordCorrect){
            return res.json({success: false, message: "Invalid credentials"});
        }

        const token = generateToken(userData._id);
        res.json({success: true, userData, message: "Login successful", token});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

//controller to check if user is authenticated
export const checkAuth = async (req, res) => {
    res.json({success: true, user: req.user});
}

// contoller to update user profile details
export const updateProfile = async (req, res) => {
    
    try {
        const { profilePic, fullName, bio} = req.body;
 
        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {fullName, bio}, {new: true});
        } else {
            // const upload = await cloudinary.uploader.upload(profilePic); 

            const upload = await cloudinary.uploader.upload(profilePic, {
    upload_preset: "chat_app_unsigned" // Use the name as shown in your dashboard
});


            updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, fullName, bio}, {new: true});
        }

         res.json({success: true, user: updatedUser, message: "Profile updated successfully"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}


// export const updateProfile = async (req, res) => {
//   try {
//     const { fullName, bio, profilePic } = req.body;
//     const userId = req.user._id;
//     let updatedUser;

//     if (!profilePic) {
//       // Only update text fields
//       updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { fullName, bio },
//         { new: true }
//       );
//     } else {
//       // Server-side upload: NO timestamp/signature needed
//       const upload = await cloudinary.uploader.upload(profilePic, {
//         folder: "profile_pics",          // optional folder
//         upload_preset: "signed_profile_pics", // must match exactly
//       });

//       updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { fullName, bio, profilePic: upload.secure_url },
//         { new: true }
//       );
//     }

//     res.json({ success: true, user: updatedUser, message: "Profile updated successfully" });
//   } catch (error) {
//     console.log("Update profile error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

