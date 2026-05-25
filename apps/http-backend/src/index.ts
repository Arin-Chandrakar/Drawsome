import express from 'express';
import "dotenv/config";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import {prisma} from "@repo/db/index"



const app= express();
app.use(express.json());

app.post("/signup",async (req,res)=>{

    const parsedData=CreateUserSchema.safeParse(req.body);
    console.log(req.body)
    console.log(parsedData)
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }
    

    try{
        const user= await prisma.user.create({
        data:{
            name:parsedData.data.name,
            username:parsedData.data.username,
            password:parsedData.data.password
        }
    })
    //db call
    res.json({
        userId: user.id
    })
    }catch(e){
        console.log(e)
        res.status(400).json({
            message:"User already exists with this username"
        })
        
    }
});

app.post("/signin", async (req,res)=>{
    
    const parsedData=SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    const user = await prisma.user.findFirst({
        where:{
            username:parsedData.data.username,
            password:parsedData.data.password
        }
    })

    if(!user){
        res.status(403).json({
            message:"Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId:user?.id
    },JWT_SECRET);

    res.json({
        token
    })
});

app.post("/room",middleware,async(req,res)=>{
    const parsedData=CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log(parsedData.error)
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    //@ts-ignore
    const userId=req.userId;

    await prisma.room.create({
        data:{
            slug:parsedData.data.name,
            adminId:userId,
        }
    })
    res.json({
        roomId:123
    })

});

app.listen(3003);