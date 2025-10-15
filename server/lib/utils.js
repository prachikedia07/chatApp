import jwt from "jsonwebtoken";

//funtion to generate jwt token
export const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token;
}