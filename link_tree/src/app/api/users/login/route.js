import connect from "@/dbconfig/dbConfig.js"
import User from "@/models/userModel.js"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import  jwt  from "jsonwebtoken"

connect;

export async function POST(NextRequest){
    // console.log('login start')
    try {
        const reqBody=await NextRequest.json()
        const {email,password}=reqBody;
        // console.log(reqBody);

        // check if user exist or not
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }
        // console.log("User exists")


        // password chacking
        const validPassword=await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }
        // console.log(user)

        // Create Token Data
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }
        // create token 
        const token =await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})
        const response=NextResponse.json({
            message:"Login successful",
            success:true,
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
    } catch (error) {
        console.log('error in login route page',error)
        return NextResponse.json({error:error.message},{status:500})
    }
}



