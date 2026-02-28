import User from "../model/user.js"
import bcrypt from "bcrypt"


// register user

export async function registerUser(req,res){
    try{
        const {name,email,password} = req.body
        const saltRounds = 10

        if(!name || !email || !password){
        return res.status(400).json({success : false , msg : "field are empty"})
        }
        
        const existedUser = await User.findOne({email})
        
        if(existedUser) return res.status(409).json({success : false, msg : "user already exist"})
        const hashedPassword = await bcrypt.hash(password,saltRounds)

        const newUser = await User.create({
            name : name,
            email : email,
            password : hashedPassword
        })

        return res.status(201).json({success : true,data  : newUser})

    }catch(error){
        res.status(500).json({success : false, error : error.message})
    }
}

// login user ->

export async function loginUser(req,res){
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({success : false , msg : "filed are empty"})
        }
        
        const user = await User.findOne({email})
        // console.log("user - ",user)

        const isPassword = bcrypt.compare(password,user.password)

        if(isPassword==false){
            return res.status(400).json({success : false, msg :"incorrect passsword"})
        }
        
    }catch(error){
        return res.status(500).json({error : error.message})
    }
}

