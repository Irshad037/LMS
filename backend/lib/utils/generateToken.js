import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "7d",
    });

    res.cookie("jwt",token,{
         httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only true in prod
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
}
