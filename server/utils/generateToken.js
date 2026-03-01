import jwt from 'jsonwebtoken'

export const generateAccessToken=(user)=>{
     return jwt.sign(
        {email : user.email},
        process.env.JWT_SECRET_KEY,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRES }
     )
}

export const generateRefreshToken = (user)=>{
    return jwt.sign(
        {email : user.email},
        process.env.JWT_REFRESH_TOKEN , 
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRES}
    )
}